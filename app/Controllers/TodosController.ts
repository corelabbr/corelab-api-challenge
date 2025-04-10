import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Todo from 'App/Models/Todo'

export default class TodosController {
  public async index({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')

    const query = Todo.query()

    if (search) {
      query.where('title', 'like', `%${search}%`)
    }

    return query.paginate(page, perPage)
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'is_favorite', 'color'])
    return Todo.create(data)
  }

  public async show({ params }: HttpContextContract) {
    return Todo.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    const data = request.only(['title', 'description', 'is_favorite', 'color'])
    todo.merge(data)
    await todo.save()
    return todo
  }

  public async destroy({ params }: HttpContextContract) {
    const todo = await Todo.findOrFail(params.id)
    await todo.delete()
  }
}

