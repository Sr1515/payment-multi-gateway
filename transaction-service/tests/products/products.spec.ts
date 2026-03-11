import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { ProductFactory } from '#database/factories/product_factory'

test.group('Products Module', () => {
  test('usuário FINANCE pode criar um produto').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const response = await client
      .post('/api/v1/products')
      .loginAs(finance)
      .json({ name: 'Assinatura Premium', amount: 9990 })

    response.assertStatus(201)
  })

  test('usuário comum (USER) não pode deletar um produto').run(async ({ client }) => {
    const user = await UserFactory.create()
    const product = await ProductFactory.create()
    const response = await client.delete(`/api/v1/products/${product.id}`).loginAs(user)

    response.assertStatus(403)
  })
})
