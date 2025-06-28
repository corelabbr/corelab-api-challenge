import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'title.required': 'O Título é obrigatório!',
  'title.max': 'O Título deve ter menos de 255 caracteres!',
  'body.required': 'O Corpo do texto é obrigatório!',
  'color.required': 'A Cor da nota é obrigatória!',
  'color.max': 'A Cor deve ter menos de 255 caracteres!',
  'favorited.boolean': 'O Favorito está incorreto!',
  'favorited.required': 'O Favorito é obrigatório!',
})
