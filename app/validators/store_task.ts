import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const storeTaskValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(3).maxLength(255),
    text: vine.string().minLength(5).maxLength(256),
    color: vine.string().trim().regex(/^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/).optional(), // The hexadecimal color code is at least 3 characters long as #f00 and at most 6 characters long as #ffffff
    isFavorite: vine.boolean(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'minLength': 'The value of {{ field }} field must be at least {{ options.minLength }} characters long',
  'maxLength': 'The value of {{ field }} field must not exceed {{ options.maxLength }} characters',
  'boolean': 'The value of {{ field }} field must be a boolean'
})
