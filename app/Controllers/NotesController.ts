import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { prisma } from '../database/prismaClient'

export default class NotesController {
  public async store({ request, response }: HttpContextContract) {
    try {
      const { title, content, isFavorite, color } = request.only([
        'title',
        'content',
        'isFavorite',
        'color',
      ])

      if (!title) {
        return response.status(400).json({ error: 'O título é obrigatório.' })
      }

      const note = await prisma.note.create({
        data: {
          title,
          content,
          isFavorite,
          color,
        },
      })

      return response.created(note)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Não foi possível criar a nota.' })
    }
  }

  public async index({ response }: HttpContextContract) {
    try {
      const notes = await prisma.note.findMany({
        orderBy: {
          isFavorite: 'desc',
        },
      })
      return response.ok(notes)
    } catch (error) {
      console.error(error)
      return response.internalServerError({ message: 'Não foi possível buscar as notas.' })
    }
  }

  public async update({ params, response, request }: HttpContextContract) {
    try {
      const noteId = params.id
      const updateDate = request.only(['title', 'content', 'isFavorite', 'color'])
      const note = await prisma.note.update({
        where: {
          id: Number(noteId),
        },
        data: updateDate,
      })
      return response.ok(note)
    } catch (error) {
      console.log(error)
      return response.internalServerError({ message: 'Não foi possível atualizar a nota' })
    }
  }
}
