import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'

import { DateTime } from 'luxon'
import User from 'App/Models/User'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public userId!: number

  @column({
    prepare: (value: object[]) => JSON.stringify(value),
  })
  public items!: object[]

  @column()
  public totalItems!: number

  @column()
  public totalPrice!: number

  @column.dateTime()
  public orderDate!: DateTime

  @belongsTo(() => User)
  public user!: BelongsTo<typeof User>

  @column()
  public status!: string

  @column.dateTime({
    autoCreate: true,
  })
  public createdAt!: DateTime

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  public updatedAt!: DateTime


}
