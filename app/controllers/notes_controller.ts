import { saveNoteValidator } from '#validators/note'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotesController {
  async index({ auth }: HttpContext) {
    const user = await auth.authenticate()
    const notes = await user.related('notes').query().whereNull('deleted_at')

    return notes
  }

  async store({ request, auth }: HttpContext) {
    const user = await auth.authenticate()

    await saveNoteValidator.validate(request.all())

    await user.related('notes').create(request.all())
    // await Note.create(request.all())

    return { message: 'Nota salva!' }
  }

  async show({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    return note
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    await saveNoteValidator.validate(request.all())

    note.title = request.input('title')
    note.body = request.input('body')
    note.color = request.input('color')
    note.favorited = request.input('favorited')
    await note.save()

    return { message: 'Nota atualizada!' }
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    await note.delete()

    return { message: 'Nota removida!' }
  }

  async restore({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNotNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Nota não encontrada!' }] })

    await note.restore()

    return { message: 'Nota restaurada!' }
  }
}
