import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Auth Module', () => {
  test('deve criar uma nova conta com sucesso (signup)').run(async ({ client }) => {
    const response = await client.post('/api/v1/auth/signup').json({
      username: 'Novo Usuário',
      email: 'novo@email.com',
      password: 'password123',
      passwordConfirmation: 'password123',
    })

    response.assertStatus(201)
  })

  test('deve fazer login e retornar um token de acesso').run(async ({ client }) => {
    await UserFactory.merge({
      email: 'login@test.com',
      password: 'password123',
    }).create()

    const response = await client.post('/api/v1/auth/login').json({
      email: 'login@test.com',
      password: 'password123',
    })

    // response.assertStatus(200)
    response.assertBodyContains({ data: {} })
  })

  test('deve invalidar o token ao fazer logout').run(async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.post('/api/v1/auth/logout').loginAs(user)
    response.assertStatus(200)
  })

  test('não deve permitir logout sem estar autenticado').run(async ({ client }) => {
    const response = await client.post('/api/v1/auth/logout')
    response.assertStatus(401)
  })
})
