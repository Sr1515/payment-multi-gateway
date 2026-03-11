import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      username: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'password123',
      role: 'USER',
    }
  })
  .state('admin', (user) => (user.role = 'ADMIN'))
  .state('manager', (user) => (user.role = 'MANAGER'))
  .state('finance', (user) => (user.role = 'FINANCE'))
  .build()
