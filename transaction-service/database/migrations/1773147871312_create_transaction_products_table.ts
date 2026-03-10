import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transaction_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()

      table.uuid('transaction_id').notNullable()
      table.uuid('product_id').notNullable()

      table.integer('quantity').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.foreign('transaction_id').references('transactions.id')
      table.foreign('product_id').references('products.id')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
