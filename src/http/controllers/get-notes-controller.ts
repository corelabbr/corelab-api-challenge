import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { GetNotesUseCase } from '../../use-cases/get-notes-use-case'
import { NotesPresenter } from '../presenters/notes-presenter'

type GetNotesControllerQuery = {
  search: string
}

export class GetNotesController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const getNotesUseCase = container.resolve(GetNotesUseCase)
    const { search } = req.query as GetNotesControllerQuery

    const notes = await getNotesUseCase.execute({ search })

    rep.status(200).send({ notes: NotesPresenter.manyToHttp(notes) })
  }
}
