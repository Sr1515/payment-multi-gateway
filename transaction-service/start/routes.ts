import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NewAccountController = () => import('#controllers/new_account_controller')
const AccessTokenController = () => import('#controllers/access_token_controller')
const ProductsController = () => import('#controllers/products_controller')
const UsersController = () => import('#controllers/users_controller')
const GatewaysController = () => import('#controllers/gateway_controller')

router
  .group(() => {
    // --- AUTH ---
    router
      .group(() => {
        router.post('signup', [NewAccountController, 'store'])
        router.post('login', [AccessTokenController, 'store'])
        router.post('logout', [AccessTokenController, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')

    // --- PRODUCTS ---
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

    // --- USERS ---
    router
      .group(() => {
        router
          .resource('users', UsersController)
          .apiOnly()
          .use('*', middleware.role({ roles: ['ADMIN', 'MANAGER'] }))
      })
      .use(middleware.auth())

    // --- GATEWAYS ---
    router
      .group(() => {
        router.resource('gateways', GatewaysController).apiOnly()

        router
          .group(() => {
            router.patch('gateways/:id/activate', [GatewaysController, 'activate'])
            router.patch('gateways/:id/deactivate', [GatewaysController, 'deactivate'])
            router.patch('gateways/:id/priority', [GatewaysController, 'changePriority'])
          })
          .use(middleware.role({ roles: ['ADMIN'] }))
      })
      .use(middleware.auth())

    // --- CLIENTS ---
  })
  .prefix('/api/v1')
