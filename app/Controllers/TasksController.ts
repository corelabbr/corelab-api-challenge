import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const { color, favorite } = request.qs()

    const query = Task.query().orderBy('is_favorite', 'desc').orderBy('created_at', 'desc')

    if (color) {
      query.where('color', color)
    }

    if (favorite !== undefined) {
      query.where('is_favorite', favorite === 'true')
    }

    return await query
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(['title', 'description', 'color', 'isFavorite'])
    const task = await Task.create(data)
    return task
  }

  public async show({ params }: HttpContextContract) {
    return await Task.findOrFail(params.id)
  }

  public async update({ params, request }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    const data = request.only(['title', 'description', 'color', 'isFavorite'])

    task.merge(data)
    await task.save()

    return task
  }

  public async destroy({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    await task.delete()

    return { message: 'Task deleted successfully' }
  }
}
