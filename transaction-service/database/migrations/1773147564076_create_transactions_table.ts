import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('client_id').notNullable()
      table.uuid('gateway_id').notNullable()
      table.string('external_id')

      table.enum('status', ['approved', 'refunded'])

      table.decimal('amount', 14, 2).notNullable()
      table.string('card_last_numbers', 4)

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('client_id').references('clients.id')
      table.foreign('gateway_id').references('gateways.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
