import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  //note
  'title.required': 'The title is required!',
  'title.maxLength': 'The title must have a maximum of 255 characters!',
  'body.required': 'The text body is required!',
  'color.required': 'The note color is required!',
  'color.maxLength': 'The color must have a maximum of 255 characters!',
  'favorited.boolean': 'The favorited status is incorrect!',
  'favorited.required': 'The favorited status is required!',
  //user
  'name.required': 'The name is required!',
  'name.max': 'The name must have less than 255 characters!',
  'email.required': 'The email is required!',
  'email.max': 'The email must have less than 255 characters!',
  'email.email': 'The email must be valid!',
  'email.database.unique': 'This email already exists!',
  'email.exists': 'User not registered!',
  'old_password.required': 'The current password is required!',
  'password.required': 'The password is required!',
  'password.confirmed': 'The password and password confirmation must be the same!',
  'file.required': 'The profile avatar is required!',
  'file.file': 'The profile avatar must be a valid file!',
  'file.max': 'The profile avatar must be less than 2MB!',
})
