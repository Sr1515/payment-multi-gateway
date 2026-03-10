import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'

export default class Gateway extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare is_activate: boolean

  @column()
  declare priority: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeCreate()
  public static assignUuid(gateway: Gateway) {
    gateway.id = uuidv4()
  }
}
