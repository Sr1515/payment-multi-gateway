import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Users Module - Full Access Control', () => {
  test('ADMIN deve conseguir listar todos os usuários (index)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    await UserFactory.createMany(2)

    const response = await client.get('/api/v1/users').loginAs(admin)
    response.assertStatus(200)
  })

  test('MANAGER deve conseguir listar todos os usuários (index)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    await UserFactory.createMany(2)

    const response = await client.get('/api/v1/users').loginAs(manager)
    response.assertStatus(200)
  })

  test('FINANCER não deve conseguir listar todos os usuários (index)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    await UserFactory.createMany(2)

    const response = await client.get('/api/v1/users').loginAs(finance)
    response.assertStatus(403)
  })

  test('USER não deve conseguir listar todos os usuários (index)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    await UserFactory.createMany(2)

    const response = await client.get('/api/v1/users').loginAs(user)
    response.assertStatus(403)
  })

  test('ADMIN deve conseguir ver detalhes de um usuário (show)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const target = await UserFactory.create()

    const response = await client.get(`/api/v1/users/${target.id}`).loginAs(admin)
    response.assertStatus(200)
  })

  test('MANAGER deve conseguir ver detalhes de um usuário (show)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const target = await UserFactory.create()

    const response = await client.get(`/api/v1/users/${target.id}`).loginAs(manager)
    response.assertStatus(200)
  })

  test('FINANCER não deve conseguir ver detalhes de um usuário (show)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const target = await UserFactory.create()

    const response = await client.get(`/api/v1/users/${target.id}`).loginAs(finance)
    response.assertStatus(403)
  })

  test('USER não deve conseguir ver detalhes de um usuário (show)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const target = await UserFactory.create()

    const response = await client.get(`/api/v1/users/${target.id}`).loginAs(user)
    response.assertStatus(403)
  })

  test('ADMIN deve conseguir atualizar um usuário (update)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const target = await UserFactory.create()

    const payload = {
      username: 'novo_username',
      email: `unique_email_${Date.now()}@test.com`,
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    const response = await client.put(`/api/v1/users/${target.id}`).loginAs(admin).json(payload)

    response.assertStatus(200)
  })

  test('MANAGER deve conseguir atualizar um usuário (update)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const target = await UserFactory.create()

    const payload = {
      username: 'novo_username_admin',
      email: `email_sucesso_${Math.random()}@email.com`,
      password: 'password123',
      passwordConfirmation: 'password123',
    }

    const response = await client.put(`/api/v1/users/${target.id}`).loginAs(manager).json(payload)

    response.assertStatus(200)
  })

  test('FINANCER não deve conseguir atualizar um usuário (update)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const target = await UserFactory.create()

    const payload = {
      username: 'Nome Atualizado',
      email: 'updated@email.com',
      password: 'newpassword123',
    }

    const response = await client.put(`/api/v1/users/${target.id}`).loginAs(finance).json(payload)

    response.assertStatus(403)
  })

  test('USER não deve conseguir atualizar um usuário (update)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const target = await UserFactory.create()

    const payload = {
      username: 'Nome Atualizado',
      email: 'updated@email.com',
      password: 'newpassword123',
    }

    const response = await client.put(`/api/v1/users/${target.id}`).loginAs(user).json(payload)

    response.assertStatus(403)
  })

  test('ADMIN deve conseguir deletar um usuário (destroy)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const target = await UserFactory.create()

    const response = await client.delete(`/api/v1/users/${target.id}`).loginAs(admin)
    response.assertStatus(204)
  })

  test('MANAGER deve conseguir deletar um usuário (destroy)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const target = await UserFactory.create()

    const response = await client.delete(`/api/v1/users/${target.id}`).loginAs(manager)
    response.assertStatus(204)
  })

  test('FINANCER deve conseguir deletar um usuário (destroy)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const target = await UserFactory.create()

    const response = await client.delete(`/api/v1/users/${target.id}`).loginAs(finance)
    response.assertStatus(403)
  })

  test('USER deve conseguir deletar um usuário (destroy)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const target = await UserFactory.create()

    const response = await client.delete(`/api/v1/users/${target.id}`).loginAs(user)
    response.assertStatus(403)
  })
})
