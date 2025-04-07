import vine from '@vinejs/vine'

/**
 * Validator to validate the payload when creating
 * a new todo list.
 */
export const createTodoListValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).maxLength(255),
    notes: vine.string().minLength(1).maxLength(1000),
    color: vine
      .string()
      .regex(/^#[0-9A-F]{6}$/i)
      .optional(),
    favorited: vine.boolean().optional(),
  })
)

/**
 * Validator to validate the payload when updating
 * an existing todo list.
 */
export const updateTodoListValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(1).maxLength(255).optional(),
    notes: vine.string().minLength(1).maxLength(1000).optional(),
    color: vine
      .string()
      .regex(/^#[0-9A-F]{6}$/i)
      .optional(),
    favorited: vine.boolean().optional(),
  })
)
