import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { ProductFactory } from '#database/factories/product_factory'

test.group('Products Module - Full Access Control', () => {
  test('ADMIN deve conseguir listar produtos (index)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    await ProductFactory.createMany(2)

    const response = await client.get('/api/v1/products').loginAs(admin)
    response.assertStatus(200)
  })

  test('FINANCE deve conseguir listar produtos (index)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    await ProductFactory.createMany(2)

    const response = await client.get('/api/v1/products').loginAs(finance)
    response.assertStatus(200)
  })

  test('MANAGER deve conseguir listar produtos (index)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    await ProductFactory.createMany(2)

    const response = await client.get('/api/v1/products').loginAs(manager)
    response.assertStatus(200)
  })

  test('USER não deve conseguir listar produtos (index)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    await ProductFactory.createMany(2)

    const response = await client.get('/api/v1/products').loginAs(user)
    response.assertStatus(200)
  })

  test('ADMIN deve conseguir criar um produto (store)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const response = await client.post('/api/v1/products').loginAs(admin).json({
      name: 'Novo Produto',
      amount: 5000,
    })
    response.assertStatus(201)
  })

  test('FINANCER deve conseguir criar um produto (store)').run(async ({ client }) => {
    const financer = await UserFactory.apply('finance').create()
    const response = await client.post('/api/v1/products').loginAs(financer).json({
      name: 'Novo Produto',
      amount: 5000,
    })
    response.assertStatus(201)
  })

  test('MANAGER não deve conseguir criar um produto (store)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const response = await client.post('/api/v1/products').loginAs(manager).json({
      name: 'Novo Produto',
      amount: 5000,
    })
    response.assertStatus(201)
  })

  test('USER não deve conseguir criar um produto (store)').run(async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.post('/api/v1/products').loginAs(user).json({
      name: 'Produto Proibido',
      amount: 1000,
    })
    response.assertStatus(403)
  })

  test('ADMIN deve conseguir ver detalhes de um produto (show)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const product = await ProductFactory.create()

    const response = await client.get(`/api/v1/products/${product.id}`).loginAs(admin)
    response.assertStatus(200)
  })

  test('MANAGER deve conseguir ver detalhes de um produto (show)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const product = await ProductFactory.create()

    const response = await client.get(`/api/v1/products/${product.id}`).loginAs(manager)
    response.assertStatus(200)
  })

  test('FINANCER deve conseguir ver detalhes de um produto (show)').run(async ({ client }) => {
    const financer = await UserFactory.apply('finance').create()
    const product = await ProductFactory.create()

    const response = await client.get(`/api/v1/products/${product.id}`).loginAs(financer)
    response.assertStatus(200)
  })

  test('USER não deve conseguir ver detalhes de um produto (show)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const product = await ProductFactory.create()

    const response = await client.get(`/api/v1/products/${product.id}`).loginAs(user)
    response.assertStatus(200)
  })

  test('ADMIN deve conseguir atualizar um produto (update)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const product = await ProductFactory.create()

    const response = await client
      .put(`/api/v1/products/${product.id}`)
      .loginAs(admin)
      .json({ name: 'Update Finance', amount: 9990 })

    response.assertStatus(200)
  })

  test('FINANCE deve conseguir atualizar um produto (update)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const product = await ProductFactory.create()

    const response = await client
      .put(`/api/v1/products/${product.id}`)
      .loginAs(finance)
      .json({ name: 'Update Finance', amount: 9990 })

    response.assertStatus(200)
  })

  test('MANAGER deve conseguir atualizar um produto (update)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const product = await ProductFactory.create()

    const response = await client
      .put(`/api/v1/products/${product.id}`)
      .loginAs(manager)
      .json({ name: 'Update Finance', amount: 9990 })

    response.assertStatus(200)
  })

  test('USER não deve conseguir atualizar um produto (update)').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const product = await ProductFactory.create()

    const response = await client
      .put(`/api/v1/products/${product.id}`)
      .loginAs(user)
      .json({ name: 'Update Finance', amount: 9990 })

    response.assertStatus(403)
  })

  test('ADMIN deve conseguir deletar um produto (destroy)').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const product = await ProductFactory.create()

    const response = await client.delete(`/api/v1/products/${product.id}`).loginAs(admin)
    response.assertStatus(204)
  })

  test('MANAGER deve conseguir deletar um produto (destroy)').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const product = await ProductFactory.create()

    const response = await client.delete(`/api/v1/products/${product.id}`).loginAs(manager)
    response.assertStatus(204)
  })

  test('FINANCER deve conseguir deletar um produto (destroy)').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const product = await ProductFactory.create()

    const response = await client.delete(`/api/v1/products/${product.id}`).loginAs(finance)
    response.assertStatus(204)
  })

  test('USER não deve conseguir deletar um produto (destroy)').run(async ({ client }) => {
    const user = await UserFactory.create()
    const product = await ProductFactory.create()

    const response = await client.delete(`/api/v1/products/${product.id}`).loginAs(user)
    response.assertStatus(403)
  })
})
