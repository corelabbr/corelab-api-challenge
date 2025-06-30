import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { storeUserValidator } from '#validators/store_user'
import { updateUserValidator } from '#validators/update_user'
import Task from '#models/task'

export default class UsersController {
  async index({ response }: HttpContext) {
    try {
      const users = await User.all()
      return users
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar usuários', error })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'fullName', 'password'])

      const payload = await storeUserValidator.validate(data)

      const userExists = await User.findBy('email', payload.email)
      if (userExists) {
        return response.badRequest({ message: 'Email already in use' })
      }

      const user = await User.create({
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password,
      })

      return response.created(user)
    } catch (error) {
      return response.unprocessableEntity({ message: 'Erro ao criar usuário', error })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.notFound({ message: 'Usuário não encontrado' })
      }
      return user
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao buscar usuário', error })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.notFound({ message: 'Usuário não encontrado' })
      }

      const payload = await updateUserValidator.validate(
        request.only(['email', 'fullName', 'password'])
      )

      user.merge(payload)
      await user.save()

      return user
    } catch (error) {
      return response.unprocessableEntity({ message: 'Erro ao atualizar usuário', error })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.find(params.id)
      if (!user) {
        return response.notFound({ message: 'Usuário não encontrado' })
      }

      const tasksCount = await Task.query()
        .where('user_id', user.id)
        .count('* as total')

      const total = Number(tasksCount[0].$extras.total)

      if (total > 0) {
        return response.status(400).json({
          message: 'Não é possível remover usuário que possui tarefas associadas.',
        })
      }

      await user.delete()
      return response.ok({ message: 'Usuário deletado com sucesso' })
    } catch (error) {
      return response.internalServerError({ message: 'Erro ao deletar usuário', error })
    }
  }

  async profile({ auth, response }: HttpContext) {
    try {
      await auth.use('api').authenticate()
      const user = auth.user!
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
      }
    } catch (error) {
      return response.unauthorized({ message: 'Não autenticado', error })
    }
  }
}
