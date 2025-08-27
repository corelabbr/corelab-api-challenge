import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare body: string | null

  @column()
  declare color: string

  @column()
  declare favorited: boolean

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: relations.BelongsTo<typeof User>

  @column.dateTime({ serializeAs: null })
  declare deletedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  public async delete() {
    this.deletedAt = DateTime.local()
    await this.save()
  }

  public async restore() {
    this.deletedAt = null
    await this.save()
  }
}
