import ClientController from '#controllers/clients_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const NewAccountController = () => import('#controllers/new_account_controller')
const AccessTokenController = () => import('#controllers/access_token_controller')
const ProductsController = () => import('#controllers/products_controller')
const UsersController = () => import('#controllers/users_controller')
const GatewaysController = () => import('#controllers/gateway_controller')
const TransactionController = () => import('#controllers/transactions_controller')

router
  .group(() => {
    // --- AUTH ROUTES---
    router
      .group(() => {
        router.post('signup', [NewAccountController, 'store'])
        router.post('login', [AccessTokenController, 'store'])
        router.post('logout', [AccessTokenController, 'destroy']).use(middleware.auth())
      })
      .prefix('auth')

    // --- PRODUCTS ROUTES---
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

    // --- USERS ROUTES ---
    router
      .group(() => {
        router
          .resource('users', UsersController)
          .apiOnly()
          .use('*', middleware.role({ roles: ['ADMIN', 'MANAGER'] }))
      })
      .use(middleware.auth())

    // --- GATEWAYS ROUTES ---
    router
      .group(() => {
        router
          .resource('gateways', GatewaysController)
          .apiOnly()
          .use(['store', 'update', 'destroy'], middleware.role({ roles: ['ADMIN'] }))

        router
          .group(() => {
            router.patch('gateways/:id/activate', [GatewaysController, 'activate'])
            router.patch('gateways/:id/deactivate', [GatewaysController, 'deactivate'])
            router.patch('gateways/:id/priority', [GatewaysController, 'changePriority'])
          })
          .use(middleware.role({ roles: ['ADMIN'] }))
      })
      .use(middleware.auth())

    // --- CLIENTS ROUTES ---
    router
      .group(() => {
        router
          .resource('clients', ClientController)
          .apiOnly()
          .use('*', middleware.role({ roles: ['ADMIN', 'MANAGER'] }))
      })
      .use(middleware.auth())

    // --- TRANSACTIONS ROUTES ---
    router.post('/transactions', [TransactionController, 'store'])

    router
      .post('transactions/reembolso', [TransactionController, 'reembolso'])
      .use(middleware.role({ roles: ['ADMIN', 'FINANCE'] }))

    router
      .group(() => {
        router
          .resource('transactions', TransactionController)
          .apiOnly()
          .except(['store'])
          .use('*', middleware.role({ roles: ['ADMIN', 'MANAGER', 'FINANCE'] }))

        router
          .get('clients/:id/purchases', [TransactionController, 'clientPurchases'])
          .use(middleware.role({ roles: ['ADMIN', 'MANAGER', 'FINANCE'] }))
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1/')
