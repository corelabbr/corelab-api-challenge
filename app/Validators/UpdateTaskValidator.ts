import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateTaskValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional({}, [rules.trim(), rules.minLength(1), rules.maxLength(120)]),
    description: schema.string.optional({}, [rules.trim(), rules.maxLength(2000)]),
    color: schema.enum.optional(['yellow', 'blue', 'green', 'peach'] as const),
    isFavorite: schema.boolean.optional(),
  })
}
