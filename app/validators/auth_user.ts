import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const authValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(255),
    password: vine.string().trim().minLength(6).maxLength(255),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'The value is not a valid email address',
  'minLength': 'The value of {{ field }} field must be at least {{ options.minLength }} characters long',
  'maxLength': 'The value of {{ field }} field must not exceed {{ options.maxLength }} characters'
})
