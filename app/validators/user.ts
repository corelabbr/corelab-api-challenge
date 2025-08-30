import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
    email: vine.string().trim().email().maxLength(255).unique({ table: 'users', column: 'email' }),
  })
)

export const updateNameValidator = vine.compile(
  vine.object({
    name: vine.string().trim().maxLength(255),
  })
)

export const updateAvatarValidator = vine.compile(
  vine.object({
    file: vine.file({ extnames: ['jpg', 'png', 'svg'], size: '2mb' }),
  })
)

export const updatePasswordValidator = vine.compile(
  vine.object({
    old_password: vine.string().trim().maxLength(255),
    password: vine.string().trim().minLength(6).maxLength(255).confirmed(),
  })
)
