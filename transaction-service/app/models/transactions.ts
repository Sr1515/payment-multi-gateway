import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, column, belongsTo, manyToMany, beforeCreate } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from './product.ts'
import Gateway from './gateway.ts'
import Client from './clients.ts'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare clientId: string

  @column()
  declare gatewayId: string

  @column()
  declare externalId: string | null

  @column()
  declare status: 'pending' | 'approved' | 'failed' | 'refunded'

  @column()
  declare amount: number

  @column()
  declare cardLastNumbers: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(transaction: Transaction) {
    transaction.id = uuidv4()
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
