// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'
export default class TodosController {
  public async create({ request }: HttpContextContract) {
    const { title, description, favorited, color } = request.only([
      'title',
      'description',
      'favorited',
      'color',
    ])
    const todos = await Todo.create({
      title,
      description,
      favorited,
      color,
    })
    return todos
  }

  public async update({ params, request }: HttpContextContract) {
    const id = params.id

    // Busca o todo ou lança erro 404 se não encontrar
    const todo = await Todo.findOrFail(id)

    // Pega os dados enviados para atualizar
    const data = request.only(['title', 'description', 'color'])

    // Atualiza os campos
    todo.merge(data)

    // Salva no banco
    await todo.save()

    return todo
  }

  public async toggleFavorite({ params }: HttpContextContract) {
    const id = params.id

    const todo = await Todo.findOrFail(id)

    todo.favorited = !todo.favorited

    await todo.save()

    return todo
  }

  public async delete({ params }: HttpContextContract) {
    const id = params.id

    const todo = await Todo.findOrFail(id)

    await todo.delete()

    return todo
  }

  public async index({ request }: HttpContextContract) {
    const favorited = request.input('favorited')

    if (favorited !== undefined) {
      return await Todo.query().where('favorited', favorited === 'true')
    }

    return await Todo.all()
  }
}
