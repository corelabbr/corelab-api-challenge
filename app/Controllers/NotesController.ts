import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { Note } from 'App/Types/Note'
import { v4 as uuidv4 } from 'uuid'
import { NoteStore } from 'App/Data/NoteStore'

export default class NotesController {
  public async index({ response }: HttpContextContract) {
    return response.ok(NoteStore)
  }

  public async create({ request, response }: HttpContextContract) {
    const data = request.only(['title', 'text', 'favorite', 'color'])

    const note: Note = {
      id: uuidv4(),
      title: data.title,
      text: data.text,
      favorite: data.favorite ?? false,
      color: data.color ?? '#ffffff',
    }

    NoteStore.push(note)
    return response.created(note)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const note = NoteStore.find((n) => n.id === params.id)
    if (!note) {
      return response.notFound({ message: 'Note not found' })
    }

    const data = request.only(['title', 'text', 'favorite', 'color'])

    note.title = data.title ?? note.title
    note.text = data.text ?? note.text
    note.favorite = data.favorite ?? note.favorite
    note.color = data.color ?? note.color

    return response.ok(note)
  }

  public async delete({ params, response }: HttpContextContract) {
    const index = NoteStore.findIndex((n) => n.id === params.id)
    if (index === -1) {
      return response.notFound({ message: 'Note not found' })
    }

    NoteStore.splice(index, 1)
    return response.ok({ message: 'Note deleted' })
  }
}
