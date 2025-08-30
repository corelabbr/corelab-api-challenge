import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(255),
    password: vine.string().maxLength(255),
  })
)

export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    email: vine.string().trim().email().maxLength(255),
    password: vine.string().minLength(6).maxLength(255).confirmed(),
  })
)
