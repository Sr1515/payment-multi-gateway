import Transaction from '#models/transaction'
import factory from '@adonisjs/lucid/factories'
import { ClientFactory } from './client_factory.ts'
import { GatewayFactory } from './gateway_factory.ts'

export const TransactionFactory = factory
  .define(Transaction, async ({ faker }) => {
    return {
      status: 'pending' as const,
      amount: faker.number.int({ min: 1000, max: 50000 }),
      externalId: faker.string.uuid(),
      cardLastNumbers: '4444',
    }
  })
  .relation('client', () => ClientFactory)
  .relation('gateway', () => GatewayFactory)
  .build()
