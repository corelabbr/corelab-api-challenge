import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

const ALLOWED_COLORS = ['yellow', 'blue', 'green', 'peach'] as const
type AllowedColor = typeof ALLOWED_COLORS[number]

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const q = request.input('q') as string | undefined
    const favorite = request.input('favorite')

    const query = Task.query()

    if (q && q.trim()) {
      query.where((b) => b.whereILike('title', `%${q}%`).orWhereILike('description', `%${q}%`))
    }

    if (favorite !== undefined) {
      const fav = String(favorite).toLowerCase() === 'true'
      query.where('is_favorite', fav)
    }

    return query.orderBy('created_at', 'desc')
  }

  public async show({ params, response }: HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) return response.notFound({ error: 'Task not found' })
    return task
  }

  public async store({ request, response }: HttpContextContract) {
    const { title, description, color, isFavorite = false } = request.only([
      'title',
      'description',
      'color',
      'isFavorite',
    ])

    if (!title || !String(title).trim()) return response.badRequest({ error: 'title is required' })
    if (!ALLOWED_COLORS.includes(color as AllowedColor)) {
      return response.badRequest({ error: `color must be one of ${ALLOWED_COLORS.join(', ')}` })
    }

    const task = await Task.create({
      title: String(title).trim(),
      description: description ?? null,
      color: color as AllowedColor,
      isFavorite: Boolean(isFavorite),
    })

    response.status(201)
    return task
  }

  public async update({ params, request, response }: HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) return response.notFound({ error: 'Task not found' })

    const payload = request.only(['title', 'description', 'color', 'isFavorite'])

    if (payload.color && !ALLOWED_COLORS.includes(payload.color as AllowedColor)) {
      return response.badRequest({ error: `color must be one of ${ALLOWED_COLORS.join(', ')}` })
    }

    task.merge({
      title: payload.title ?? task.title,
      description: payload.description ?? task.description,
      color: (payload.color as AllowedColor) ?? task.color,
      isFavorite:
        payload.isFavorite === undefined ? task.isFavorite : Boolean(payload.isFavorite),
    })

    await task.save()
    return task
  }

  public async destroy({ params, response }: HttpContextContract) {
    const task = await Task.find(params.id)
    if (!task) return response.notFound({ error: 'Task not found' })
    await task.delete()
    return response.noContent()
  }
}
