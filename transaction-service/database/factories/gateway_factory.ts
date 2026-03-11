import Gateway from '#models/gateway'
import factory from '@adonisjs/lucid/factories'

export const GatewayFactory = factory
  .define(Gateway, async ({ faker }) => {
    return {
      name: faker.company.name(),
      is_activate: true,
      priority: faker.number.int({ min: 1, max: 10 }),
    }
  })
  .build()
