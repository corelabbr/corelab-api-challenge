import Note from '#models/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  async index({}: HttpContext) {
    const notes = await Note.query().whereNull('deleted_at').preload('user')

    return notes
  }

  async store({ request }: HttpContext) {
    await Note.create(request.only(['title', 'body', 'color', 'favorited', 'user_id']))

    return { message: 'Nota salva!' }
  }

  async show({ params }: HttpContext) {
    const note = await Note.query().whereNull('deleted_at').where('id', params.id).first()

    return note
  }

  async update({ params, request, response }: HttpContext) {
    const note = await Note.query().whereNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ error: 'Nota não encontrada!' })

    note.title = request.input('title')
    note.body = request.input('body')
    note.color = request.input('color')
    note.favorited = request.input('favorited')
    await note.save()

    return { message: 'Nota atualizada!' }
  }

  async destroy({ params, response }: HttpContext) {
    const note = await Note.query().whereNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ error: 'Nota não encontrada!' })

    await note.delete()

    return { message: 'Nota removida!' }
  }

  async restore({ params, response }: HttpContext) {
    const note = await Note.query().whereNotNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ error: 'Nota não encontrada!' })

    await note.restore()

    return { message: 'Nota restaurada!' }
  }
}
