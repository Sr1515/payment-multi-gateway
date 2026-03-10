import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import ProductsController from '#controllers/products_controller'
import UserController from '#controllers/users_controller'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // AUTH
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessToken, 'store'])
        router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    // PRODUCTS
    router
      .group(() => {
        router
          .resource('products', ProductsController)
          .apiOnly()
          .use(
            ['store', 'update', 'destroy'],
            middleware.role({ roles: ['ADMIN', 'MANAGER', 'FINANCE'] })
          )
      })
      .use(middleware.auth())

    // USERS
    router.group(() => {
      router
        .resource('users', UserController)
        .apiOnly()
        .use(
          ['update', 'destroy', 'index', 'show'],
          middleware.role({ roles: ['ADMIN', 'MANAGER'] })
        )
    })
  })
  .prefix('/api/v1')
