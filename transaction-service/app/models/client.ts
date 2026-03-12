import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import Transaction from './transaction.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Transaction)
  declare transactions: HasMany<typeof Transaction>

  @beforeCreate()
  public static assignUuid(client: Client) {
    client.id = uuidv4()
  }
}
