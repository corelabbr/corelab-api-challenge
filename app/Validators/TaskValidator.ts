import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const COLORS = [
  'color1', 'color2', 'color3', 'color4', 'color5', 'color6',
  'color7', 'color8', 'color9', 'color10', 'color11', 'color12', '#FFF', '#fff', '#ffffff'
]

export const createTaskSchema = schema.create({
  title: schema.string({}, [rules.trim(), rules.minLength(1)]),
  description: schema.string.optional({ trim: true }),
  isFavorite: schema.boolean.optional(),
  color: schema.enum.optional(COLORS),
})

export const updateTaskSchema = schema.create({
  title: schema.string.optional({}, [rules.trim(), rules.minLength(1)]),
  description: schema.string.optional({ trim: true }),
  isFavorite: schema.boolean.optional(),
  color: schema.enum.optional(COLORS),
})
