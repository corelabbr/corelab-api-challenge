import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const updateTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255).optional(),
    text: vine.string().minLength(5).maxLength(256).optional(),
    color: vine.string().trim().regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/).optional(),
    isFavorite: vine.boolean().optional(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'minLength': 'The value of {{ field }} field must be at least {{ options.minLength }} characters long',
  'maxLength': 'The value of {{ field }} field must not exceed {{ options.maxLength }} characters',
  'boolean': 'The value of {{ field }} field must be a boolean'
})
