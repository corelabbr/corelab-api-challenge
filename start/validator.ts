import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  //note
  'title.required': 'O Título é obrigatório!',
  'title.maxLength': 'O Título deve ter no máximo 255 caracteres!',
  'body.required': 'O Corpo do texto é obrigatório!',
  'color.required': 'A Cor da nota é obrigatória!',
  'color.maxLength': 'A Cor deve ter no máximo 255 caracteres!',
  'favorited.boolean': 'O Favorito está incorreto!',
  'favorited.required': 'O Favorito é obrigatório!',
  //user
  'name.required': 'O Nome é obrigatório!',
  'name.max': 'O Nome deve ter menos de 255 caracteres!',
  'email.required': 'O Email é obrigatório!',
  'email.max': 'O Email deve ter menos de 255 caracteres!',
  'email.email': 'O Email deve ser válido!',
  'email.database.unique': 'Este Email já existe!',
  'email.exists': 'Usuario não cadastrado!',
  'password.required': 'A Senha é obrigatória!',
  'password.confirmed': 'A Senha e Confirmação de Senha devem ser iguais!',
  'file.required': 'O Avatar de perfil é obrigatório!',
  'file.file': 'O Avatar de perfil deve ser um arquivo válido!',
  'file.max': 'O Avatar de perfil deve ter menos de 2MB!',
})
