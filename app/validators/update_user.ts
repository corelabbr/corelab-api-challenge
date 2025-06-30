import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// Validator para atualização de usuário
export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(255).optional(),
    fullName: vine
      .string()
      .trim()
      .maxLength(255)
      .regex(/^([A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)(\s[A-ZÁÉÍÓÚÂÊÎÔÛÃÕÇ][a-záéíóúâêîôûãõç]+)+$/)
      .optional(),
    password: vine
      .string()
      .trim()
      .maxLength(255)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
      .optional(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  required: 'The {{ field }} field is required',
  string: 'The value of {{ field }} field must be a string',
  email: 'The value is not a valid email address',
  minLength:
    'The value of {{ field }} field must be at least {{ options.minLength }} characters long',
  maxLength: 'The value of {{ field }} field must not exceed {{ options.maxLength }} characters',
})
