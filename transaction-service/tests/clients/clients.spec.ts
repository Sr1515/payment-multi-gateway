import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { ClientFactory } from '#database/factories/client_factory'

test.group('Clients Module', () => {
  test('ADMIN deve conseguir listar todos os clientes (index)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    await ClientFactory.createMany(3)

    const response = await client.get('/api/v1/clients').loginAs(admin)
    response.assertStatus(200)
  })

  test('MANAGER deve conseguir listar todos os clientes (index)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    await ClientFactory.createMany(3)

    const response = await client.get('/api/v1/clients').loginAs(manager)
    response.assertStatus(200)
  })

  test('FINANCER não deve conseguir listar todos os clientes (index)').run(async ({ client }) => {
    const financer = await UserFactory.apply('finance').create()
    await ClientFactory.createMany(3)

    const response = await client.get('/api/v1/clients').loginAs(financer)
    response.assertStatus(403)
  })

  test('USER não deve conseguir listar todos os clientes (index)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    await ClientFactory.createMany(3)

    const response = await client.get('/api/v1/clients').loginAs(user)
    response.assertStatus(403)
  })

  test('ADMIN deve conseguir ver detalhes de um cliente com transações e produtos (show)').run(
    async ({ client }) => {
      const admin = await UserFactory.apply('admin').create()
      const dbClient = await ClientFactory.create()
      const response = await client.get(`/api/v1/clients/${dbClient.id}`).loginAs(admin)

      response.assertStatus(200)
    }
  )

  test('MANAGER deve conseguir ver detalhes de um cliente com transações e produtos (show)').run(
    async ({ client }) => {
      const manager = await UserFactory.apply('manager').create()
      const dbClient = await ClientFactory.create()
      const response = await client.get(`/api/v1/clients/${dbClient.id}`).loginAs(manager)
      response.assertStatus(200)
    }
  )

  test('FINANCER não deve ver detalhes de um cliente com transações e produtos (show)').run(
    async ({ client }) => {
      const financer = await UserFactory.apply('finance').create()
      const dbClient = await ClientFactory.create()
      const response = await client.get(`/api/v1/clients/${dbClient.id}`).loginAs(financer)
      response.assertStatus(403)
    }
  )

  test('USER não deve conseguir ver detalhes de um cliente com transações e produtos (show)').run(
    async ({ client }) => {
      const user = await UserFactory.apply().create()
      const dbClient = await ClientFactory.create()
      const response = await client.get(`/api/v1/clients/${dbClient.id}`).loginAs(user)
      response.assertStatus(403)
    }
  )

  test('FINANCER não deve listar clientes').run(async ({ client }) => {
    const financer = await UserFactory.apply('finance').create()
    const response = await client.get('/api/v1/clients').loginAs(financer)
    response.assertStatus(403)
  })

  test('USER não deve listar clientes').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const response = await client.get('/api/v1/clients').loginAs(user)
    response.assertStatus(403)
  })

  test('deve retornar 404 ao buscar um cliente inexistente').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const uuidInexistente = '00000000-0000-0000-0000-000000000000'

    const response = await client.get(`/api/v1/clients/${uuidInexistente}`).loginAs(admin)
    response.assertStatus(404)
  })

  test('ADMIN deve conseguir criar um novo cliente (store)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const payload = {
      name: 'Cliente Novo Admin',
      email: 'admin_test@exemplo.com',
    }

    const response = await client.post('/api/v1/clients').json(payload).loginAs(admin)

    response.assertStatus(201)
    response.assertBodyContains({ name: payload.name })
  })

  test('MANAGER deve conseguir criar um novo cliente (store)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const payload = {
      name: 'Cliente Novo Manager',
      email: 'manager_test@exemplo.com',
    }

    const response = await client.post('/api/v1/clients').json(payload).loginAs(manager)

    response.assertStatus(201)
    response.assertBodyContains({ name: payload.name })
  })

  test('FINANCE não deve conseguir criar um novo cliente (store)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const payload = {
      name: 'Cliente Tentativa Finance',
      email: 'finance_fail@exemplo.com',
    }

    const response = await client.post('/api/v1/clients').json(payload).loginAs(finance)

    response.assertStatus(403)
  })

  test('USER não deve conseguir criar um novo cliente (store)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const payload = {
      name: 'Cliente Tentativa User',
      email: 'user_fail@exemplo.com',
    }

    const response = await client.post('/api/v1/clients').json(payload).loginAs(user)

    response.assertStatus(403)
  })
})
