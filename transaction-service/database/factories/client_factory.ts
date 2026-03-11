import Client from '#models/clients'
import factory from '@adonisjs/lucid/factories'

export const ClientFactory = factory
  .define(Client, async ({ faker }) => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
    }
  })
  .build()
