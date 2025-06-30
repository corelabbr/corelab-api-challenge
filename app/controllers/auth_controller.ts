import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { authValidator } from '#validators/auth_user'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
  public async login({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password'])

      const payload = await authValidator.validate(data)

      const user = await User.findBy('email', payload.email)
      if (!user) {
        return response.unauthorized({ message: 'Credenciais inválidas' })
      }

      const isPasswordValid = await hash.verify(user.password, payload.password)
      if (!isPasswordValid) {
        return response.unauthorized({ message: 'Credenciais inválidas' })
      }

      const token = await User.accessTokens.create(user)
      if (!token.value) {
        return response.internalServerError({ message: 'Erro ao gerar token' })
      }

      return response.status(201).json({
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
        },
        token: {
          type: 'bearer',
          value: token.value.release(),
        },
      })

    } catch (error) {
      return response.unprocessableEntity({
        message: 'Erro de validação ao fazer login',
        error
      })
    }
  }
}
