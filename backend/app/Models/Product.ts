import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public name!: string

  @column()
  public price!: number

  @column()
  public image!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column()
public description!: string

@column()
public category!: string

@column()
public brand!: string
  @column()
public version!: number

  @column.dateTime({
    autoCreate: true,
    autoUpdate: true,
  })
  public updatedAt!: DateTime
}
