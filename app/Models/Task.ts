import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export type TaskColor = 'yellow' | 'blue' | 'green' | 'peach'

export default class Task extends BaseModel {
  public static table = 'tasks'

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description?: string | null

  @column()
  public color: TaskColor

  @column({ columnName: 'is_favorite', serializeAs: 'isFavorite' })
  public isFavorite: boolean

  @column.dateTime({ columnName: 'created_at', autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ columnName: 'updated_at', autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
