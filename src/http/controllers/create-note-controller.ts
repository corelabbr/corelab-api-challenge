import { FastifyReply, FastifyRequest } from 'fastify'
import { container } from 'tsyringe'
import { CreateNoteUseCase } from '../../use-cases/create-note-use-case'
import { NotesPresenter } from '../presenters/notes-presenter'

type CreateNoteRequestBody = {
  title: string
  description: string
  color: string
  isFavorite: boolean
}

export class CreateNoteController {
  async handle(req: FastifyRequest, rep: FastifyReply) {
    const { isFavorite, description, title, color } =
      req.body as CreateNoteRequestBody

    const createNoteUseCase = container.resolve(CreateNoteUseCase)

    const note = await createNoteUseCase.execute({
      isFavorite,
      description,
      title,
      color,
    })

    rep.status(201).send(NotesPresenter.toHTTP(note))
  }
}
