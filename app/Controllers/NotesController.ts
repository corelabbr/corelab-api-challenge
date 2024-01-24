import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Note from 'App/Models/Note'

export default class NotesController {
  public async favorites({}: HttpContextContract) {
    return await Note.query().where('favorite', 'true').orderBy('createdAt', 'asc')
  }

  public async others({}: HttpContextContract) {
    return await Note.query().where('favorite', 'false').orderBy('createdAt', 'asc')
  }

  public async search({ request }: HttpContextContract) {
    return await Note.query()
      .where('title', 'LIKE', `%${request.params().param}%`)
      .orWhere('description', 'LIKE', `%${request.params().param}%`)
  }

  public async store({ request, response }: HttpContextContract) {
    const note: Note = await Note.create({
      title: request.input('title'),
      favorite: request.input('favorite'),
      color: request.input('color'),
      description: request.input('description'),
    })
    if (note) {
      return note
    }
    response.status(422).send({
      status: 'error',
      message: 'Algo deu errado',
    })
  }

  public async update({ request }: HttpContextContract) {
    const note: Note = await Note.findOrFail(request.params().id)
    note.title = request.input('title')
    note.color = request.input('color')
    note.favorite = request.input('favorite')
    note.description = request.input('description')
    await note.save()
    return note
  }

  public async destroy({ request, response }: HttpContextContract) {
    const note: Note = await Note.findOrFail(request.params().id)
    if (note) {
      note.delete()
      return response.status(200).send({
        status: 'success',
        message: 'Nota excluida',
      })
    }
    return response.status(404).send({
      status: 'error',
      message: 'Algo deu errado',
    })
  }
}
