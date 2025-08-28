import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ request }: HttpContextContract) {
    const { q, favorite } = request.qs()

    const onlyFavorites =
      typeof favorite === 'string'
        ? ['true', '1'].includes(favorite.toLowerCase())
        : favorite === true

    const tasks = await Task.query()
      .if(q, (qb) => {
        qb.where((sub) => {
          sub.whereILike('title', `%${q}%`).orWhereILike('description', `%${q}%`)
        })
      })
      .if(onlyFavorites, (qb) => qb.where('is_favorite', true))
      .orderBy('created_at', 'desc')

    return tasks
  }

  public async show({ params }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    return task
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = request.only(['title', 'description', 'color', 'isFavorite'])

    const data = {
      title: String(payload.title || '').trim(),
      description: payload.description ?? null,
      color: (payload.color ?? 'yellow') as any,
      isFavorite: Boolean(payload.isFavorite ?? false),
    }

    if (!data.title) {
      return response.badRequest({ message: 'title é obrigatório' })
    }

    const task = await Task.create({
      title: data.title,
      description: data.description,
      color: data.color,
      isFavorite: data.isFavorite,
    })

    response.status(201)
    return task
  }

  public async update({ params, request }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    const payload = request.only(['title', 'description', 'color', 'isFavorite'])

    task.merge({
      ...(payload.title !== undefined ? { title: String(payload.title).trim() } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.color !== undefined ? ({ color: payload.color } as any) : {}),
      ...(payload.isFavorite !== undefined ? { isFavorite: Boolean(payload.isFavorite) } : {}),
    })

    await task.save()
    return task
  }

  public async destroy({ params, response }: HttpContextContract) {
    const task = await Task.findOrFail(params.id)
    await task.delete()
    return response.noContent()
  }
}
