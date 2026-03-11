import { test } from '@japa/runner'
import { UserFactory } from '#database/factories/user_factory'
import { GatewayFactory } from '#database/factories/gateway_factory'

test.group('Gateways Module', () => {
  test('ADMIN pode trocar prioridade do gateway').run(async ({ client }) => {
    const admin = await UserFactory.apply('admin').create()
    const gateway = await GatewayFactory.create()

    const response = await client
      .patch(`/api/v1/gateways/${gateway.id}/priority`)
      .loginAs(admin)
      .json({ priority: 1 })

    response.assertStatus(200)
  })
})
