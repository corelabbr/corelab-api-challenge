import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class BrandValidator {
  constructor(protected ctx: HttpContextContract) {}

  public static saveBrand(request) {
    const Schema = schema.create({
      name: schema.string(),
    })

    return request.validate({
      schema: Schema,
    })
  }

  public messages = {}
}
