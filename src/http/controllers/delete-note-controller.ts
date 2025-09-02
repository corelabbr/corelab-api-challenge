import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { DeleteNoteUseCase } from '../../use-cases/delete-note-use-case'

type DeleteNoteRequestParam = {
  id: number
}

export class DeleteNoteController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { id } = req.params as DeleteNoteRequestParam

    const deleteNoteUseCase = container.resolve(DeleteNoteUseCase)

    await deleteNoteUseCase.execute({
      noteId: id,
    })

    rep.status(204).send(null)
  }
}
