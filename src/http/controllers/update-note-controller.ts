import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundException } from '../../errors/resource-not-found'
import { UpdateNoteUseCase } from '../../use-cases/update-note-use-case'
import { NotesPresenter } from '../presenters/notes-presenter'

type UpdateNoteRequestBody = {
  title: string
  description: string
  color: string
  isFavorite: boolean
}
type UpdateNoteRequestParam = {
  id: number
}

export class UpdateNoteController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { description, title, color, isFavorite } =
      req.body as UpdateNoteRequestBody
    const { id } = req.params as UpdateNoteRequestParam

    const updateNoteUseCase = container.resolve(UpdateNoteUseCase)

    try {
      const note = await updateNoteUseCase.execute({
        description,
        title,
        color,
        isFavorite,
        noteId: id,
      })

      rep.status(200).send(NotesPresenter.toHTTP(note))
    } catch (err) {
      if (err instanceof ResourceNotFoundException) {
        return rep.status(404).send({
          message: err.message,
          status: 'NOT_FOUND',
          code: 404,
        })
      }

      return rep.status(500).send({
        message: 'Internal server error',
        status: 'INTERNAL_SERVER_ERROR',
        code: 500,
      })
    }
  }
}
