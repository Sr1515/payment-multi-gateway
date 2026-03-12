import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { GatewayFactory } from '#database/factories/gateway_factory'

test.group('Gateways Module - Permissions', () => {
  test('ADMIN deve conseguir criar um gateway').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const payload = { name: 'Stripe', adapter: 'stripe', priority: 1 }

    const response = await client.post('/api/v1/gateways').loginAs(admin).json(payload)
    response.assertStatus(201)
  })

  test('MANAGER não deve conseguir criar um gateway').run(async ({ client }) => {
    const role = "'manager'".replace(/['"]+/g, '') as any
    const user = await UserFactory.apply(role).create()

    const response = await client.post('/api/v1/gateways').loginAs(user).json({ name: 'Fail' })
    response.assertStatus(403)
  })

  test('FINANCE não deve conseguir criar um gateway').run(async ({ client }) => {
    const role = "'finance'".replace(/['"]+/g, '') as any
    const user = await UserFactory.apply(role).create()

    const response = await client.post('/api/v1/gateways').loginAs(user).json({ name: 'Fail' })
    response.assertStatus(403)
  })

  test('USER não deve conseguir criar um gateway').run(async ({ client }) => {
    const user = await UserFactory.apply().create() // Assume o padrão USER

    const response = await client.post('/api/v1/gateways').loginAs(user).json({ name: 'Fail' })
    response.assertStatus(403)
  })

  test('ADMIN deve conseguir ativar e desativar um gateway').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const gateway = await GatewayFactory.create()

    const act = await client.patch(`/api/v1/gateways/${gateway.id}/activate`).loginAs(admin)
    act.assertStatus(200)

    const deact = await client.patch(`/api/v1/gateways/${gateway.id}/deactivate`).loginAs(admin)
    deact.assertStatus(200)
  })

  test('MANAGER não deve conseguir ativar e desativar').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const gateway = await GatewayFactory.create()

    const act = await client.patch(`/api/v1/gateways/${gateway.id}/activate`).loginAs(manager)
    act.assertStatus(403)

    const deact = await client.patch(`/api/v1/gateways/${gateway.id}/deactivate`).loginAs(manager)
    deact.assertStatus(403)
  })

  test('FINANCER não deve conseguir ativar e desativar um gateway').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const gateway = await GatewayFactory.create()

    const act = await client.patch(`/api/v1/gateways/${gateway.id}/activate`).loginAs(finance)
    act.assertStatus(403)

    const deact = await client.patch(`/api/v1/gateways/${gateway.id}/deactivate`).loginAs(finance)
    deact.assertStatus(403)
  })

  test('USER não deve conseguir ativar e desativar um gateway').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const gateway = await GatewayFactory.create()

    const act = await client.patch(`/api/v1/gateways/${gateway.id}/activate`).loginAs(user)
    act.assertStatus(403)

    const deact = await client.patch(`/api/v1/gateways/${gateway.id}/deactivate`).loginAs(user)
    deact.assertStatus(403)
  })

  test('ADMIN deve conseguir alterar a prioridade').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const gateway = await GatewayFactory.create()

    const response = await client
      .patch(`/api/v1/gateways/${gateway.id}/priority`)
      .loginAs(admin)
      .json({ priority: 5 })

    response.assertStatus(200)
  })

  test('FINANCE não deve conseguir alterar a prioridade').run(async ({ client }) => {
    const finance = await UserFactory.apply('finance').create()
    const gateway = await GatewayFactory.create()

    const response = await client
      .patch(`/api/v1/gateways/${gateway.id}/priority`)
      .loginAs(finance)
      .json({ priority: 5 })

    response.assertStatus(403)
  })

  test('MANAGER não deve conseguir alterar a prioridade').run(async ({ client }) => {
    const manager = await UserFactory.apply('manager').create()
    const gateway = await GatewayFactory.create()

    const response = await client
      .patch(`/api/v1/gateways/${gateway.id}/priority`)
      .loginAs(manager)
      .json({ priority: 5 })

    response.assertStatus(403)
  })

  test('USER não deve conseguir alterar a prioridade').run(async ({ client }) => {
    const user = await UserFactory.apply().create()
    const gateway = await GatewayFactory.create()

    const response = await client
      .patch(`/api/v1/gateways/${gateway.id}/priority`)
      .loginAs(user)
      .json({ priority: 5 })

    response.assertStatus(403)
  })
})
