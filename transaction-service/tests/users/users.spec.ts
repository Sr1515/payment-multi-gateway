import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'

test.group('Users Module', () => {
  test('usuário comuns logados não pode listar usuários (index)').run(async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/api/v1/users').loginAs(user)
    response.assertStatus(403)
  })

  test('usuário FINANCE não pode criar/deletar usuários (RBAC)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const response = await client.post('/api/v1/users').loginAs(finance).json({})
    response.assertStatus(403)
  })
})
