import { DateTime } from 'luxon';
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm';
import Favorite from './Favorite';

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
	public id: number;

  @column()
  public name: string;

  @column()
  public brand: string;

  @column()
  public description: string;

  @column()
  public plate: string;

  @column()
  public year: number;

  @column()
  public color: string;

  @column()
  public km: number;

  @column()
  public price: number;

  @column()
  public userId: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => Favorite)
  public favorites: HasMany<typeof Favorite>;

}
