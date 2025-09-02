import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { ResourceNotFoundException } from '../../errors/resource-not-found'
import { PatchNoteUseCase } from '../../use-cases/patch-note-use-case'
import { NotesPresenter } from '../presenters/notes-presenter'

type PatchNoteRequestBody = {
  title?: string
  description?: string
  color?: string
  isFavorite?: boolean
}
type PatchNoteRequestParam = {
  id: number
}

export class PatchNoteController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { description, title, color, isFavorite } =
      req.body as PatchNoteRequestBody
    const { id } = req.params as PatchNoteRequestParam

    const patchNoteUseCase = container.resolve(PatchNoteUseCase)

    try {
      const note = await patchNoteUseCase.execute({
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
