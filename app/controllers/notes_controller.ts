import Note from '#models/note'
import { saveNoteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  async index({}: HttpContext) {
    const notes = await Note.query().whereNull('deleted_at').preload('user')

    return notes
  }

  async store({ request }: HttpContext) {
    const user = request.all()
    await saveNoteValidator.validate(user)

    await Note.create(user)

    return { message: 'Nota salva!' }
  }

  async show({ params, response }: HttpContext) {
    const note = await Note.query().whereNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    return note
  }

  async update({ params, request, response }: HttpContext) {
    const note = await Note.query().whereNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    const user = request.all()
    await saveNoteValidator.validate(user)

    note.title = user.input('title')
    note.body = user.input('body')
    note.color = user.input('color')
    note.favorited = user.input('favorited')
    await note.save()

    return { message: 'Nota atualizada!' }
  }

  async destroy({ params, response }: HttpContext) {
    const note = await Note.query().whereNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    await note.delete()

    return { message: 'Nota removida!' }
  }

  async restore({ params, response }: HttpContext) {
    const note = await Note.query().whereNotNull('deleted_at').where('id', params.id).first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    await note.restore()

    return { message: 'Nota restaurada!' }
  }
}
