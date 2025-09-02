import { inject, injectable } from 'tsyringe'
import { Note } from '../entities/note'
import { NotesRepository } from '../repositories/notes-repository'

type CreateNoteUseCaseRequest = {
  title: string
  description: string
  color: string
  isFavorite: boolean
}

@injectable()
export class CreateNoteUseCase {
  constructor(
    @inject('NotesRepository')
    private noteRepository: NotesRepository,
  ) {}

  async execute({
    isFavorite,
    description,
    title,
    color,
  }: CreateNoteUseCaseRequest) {
    const rawNote = new Note({
      isFavorite,
      description,
      title,
      color,
    })

    const note = await this.noteRepository.create(rawNote)

    return note
  }
}
