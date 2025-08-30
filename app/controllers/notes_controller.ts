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

    return { message: 'Note saved!' }
  }

  async show({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Note not found!' }] })

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
    if (!note) return response.status(422).json({ errors: [{ message: 'Note not found!' }] })

    await saveNoteValidator.validate(request.all())

    note.title = request.input('title')
    note.body = request.input('body')
    note.color = request.input('color')
    note.favorited = request.input('favorited')
    await note.save()

    return { message: 'Note updated!' }
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Note not found!' }] })

    await note.delete()

    return { message: 'Note removed!' }
  }

  async restore({ params, auth, response }: HttpContext) {
    const user = await auth.authenticate()
    const note = await user
      .related('notes')
      .query()
      .whereNotNull('deleted_at')
      .where('id', params.id)
      .first()
    if (!note) return response.status(422).json({ errors: [{ message: 'Note not found!' }] })

    await note.restore()

    return { message: 'Note restored!' }
  }
}
