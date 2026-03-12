import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, column, belongsTo, manyToMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js' // Dica: use .js em vez de .ts nos imports internos
import Gateway from './gateway.js'
import Client from './client.js'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column({ columnName: 'client_id' })
  declare clientId: string

  @column({ columnName: 'gateway_id' })
  declare gatewayId: string

  @column({ columnName: 'external_id' })
  declare externalId: string | null

  @column()
  declare status: 'approved' | 'refunded'

  @column()
  declare amount: number

  @column({ columnName: 'card_last_numbers' })
  declare cardLastNumbers: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(transaction: Transaction) {
    if (!transaction.id) {
      transaction.id = uuidv4()
    }
  }

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Gateway)
  declare gateway: BelongsTo<typeof Gateway>

  @manyToMany(() => Product, {
    pivotTable: 'transaction_products',
    pivotForeignKey: 'transaction_id',
    pivotRelatedForeignKey: 'product_id',
    pivotColumns: ['quantity'],
  })
  declare products: ManyToMany<typeof Product>
}
