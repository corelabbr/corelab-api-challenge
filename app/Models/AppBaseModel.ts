import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
import CamelCaseNamingStrategy from 'App/Strategies/CamelCaseNamingStartegy'

export default class AppBaseModel extends BaseModel {
  public static namingStrategy = new CamelCaseNamingStrategy()
}
