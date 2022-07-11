import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Vehicle extends BaseModel {
  //public serializeExtras = true

  public serializeExtras() {
    return {
        isFavorite : this.$extras.is_Favorite
    }
  }
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public plate: string;

  @column()
  public isFavorite: number;

  @column()
  public year: number;

  @column()
  public color: string;
  
  @column()
  public price: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
