import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import drive from '@adonisjs/drive/services/main'
import { randomUUID } from 'node:crypto'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    await loginValidator.validate(request.all())

    const user = await User.query().where('email', request.input('email')).first()

    const isPasswordValid = await hash.verify(user?.password as string, request.input('password'))

    if (!user || !isPasswordValid) {
      return response.status(422).json({ errors: [{ message: 'The credentials are incorrect!' }] })
    }

    const token = await User.accessTokens.create(user)
    return { token: token.value!.release() }
  }

  async register({ request }: HttpContext) {
    await registerValidator.validate(request.all())

    // http://localhost:3333/uploads/avatar/{filename}
    const disk = drive.use()
    const file = await disk.file('user.png').getBytes()
    const fileName = `${randomUUID()}.png`
    await disk.put(`./avatar/${fileName}`, file)

    const data = {
      name: request.input('name'),
      email: request.input('email'),
      avatar: fileName,
      password: request.input('password'),
    }

    const user = await User.create(data)

    const token = await User.accessTokens.create(user)
    return { token: token.value!.release() }
  }

  async logout({ auth }: HttpContext) {
    const user = await auth.authenticate()

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return { message: 'You have been logged out.' }
  }
}
