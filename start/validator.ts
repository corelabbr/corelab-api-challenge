import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'title.required': 'O Título é obrigatório!',
  'title.maxLength': 'O Título deve ter no máximo 255 caracteres!',
  'body.required': 'O Corpo do texto é obrigatório!',
  'color.required': 'A Cor da nota é obrigatória!',
  'color.maxLength': 'A Cor deve ter no máximo 255 caracteres!',
  'favorited.boolean': 'O Favorito está incorreto!',
  'favorited.required': 'O Favorito é obrigatório!',
})
