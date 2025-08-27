import {
  updateUserValidator,
  updateNameValidator,
  updateAvatarValidator,
  updatePasswordValidator,
} from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import drive from '@adonisjs/drive/services/main'
import { randomUUID } from 'node:crypto'

export default class UserController {
  async show({ auth }: HttpContext) {
    const user = await auth.authenticate()
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    }
  }

  async update({ request, auth }: HttpContext) {
    const user = await auth.authenticate()

    if (user.email !== request.input('email')) {
      await updateUserValidator.validate(request.all())
    } else {
      await updateNameValidator.validate(request.all())
    }

    user.name = request.input('name')
    user.email = request.input('email')
    await user.save()

    return { message: 'Dados atualizados!' }
  }

  async updateAvatar({ request, auth }: HttpContext) {
    const user = await auth.authenticate()

    await updateAvatarValidator.validate(request.all())

    const disk = drive.use()
    const file = request.file('file')
    const fileName = `${randomUUID()}.${file?.extname}`
    await file?.moveToDisk(`./avatar/${fileName}`, disk)

    user.avatar = fileName
    user.save()

    return { message: 'Avatar de perfil atualizado!' }
  }

  async updatePassword({ request, auth, response }: HttpContext) {
    const user = await auth.authenticate()

    await updatePasswordValidator.validate(request.all())

    const oldPasswordIsValid = await hash.verify(user.password, request.input('old_password'))

    if (!oldPasswordIsValid) {
      return response
        .status(422)
        .json({ errors: [{ message: 'As credenciais estão incorretas!' }] })
    }

    user.password = request.input('password')
    user.save()

    return { message: 'Senha atualizada!' }
  }
}
