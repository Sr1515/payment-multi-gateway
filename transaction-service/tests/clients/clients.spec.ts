import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { ClientFactory } from '#database/factories/client_factory'

test.group('Clients Module', () => {
  test('ADMIN ou MANAGER deve conseguir listar todos os clientes (index)').run(
    async ({ client }) => {
      const manager = await UserFactory.apply('manager').create()
      await ClientFactory.createMany(3)

      const response = await client.get('/api/v1/clients').loginAs(manager)

      response.assertStatus(200)
    }
  )

  test('ADMIN deve conseguir ver detalhes de um cliente com transações e produtos (show)').run(
    async ({ client }) => {
      const admin = await UserFactory.apply('admin').create()
      const dbClient = await ClientFactory.create()
      const response = await client.get(`/api/v1/clients/${dbClient.id}`).loginAs(admin)

      response.assertStatus(200)
    }
  )

  test('usuário sem permissão (ex: FINANCE) não deve listar clientes').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const response = await client.get('/api/v1/clients').loginAs(finance)
    response.assertStatus(403)
  })

  test('deve retornar 404 ao buscar um cliente inexistente').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const uuidInexistente = '00000000-0000-0000-0000-000000000000'

    const response = await client.get(`/api/v1/clients/${uuidInexistente}`).loginAs(admin)
    response.assertStatus(404)
  })
})
