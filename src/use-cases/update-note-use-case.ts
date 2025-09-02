import { inject, injectable } from 'tsyringe'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { NotesRepository } from '../repositories/notes-repository'

type UpdateNoteUseCaseRequest = {
  title: string
  description: string
  color: string
  isFavorite: boolean
  noteId: number
}

@injectable()
export class UpdateNoteUseCase {
  constructor(
    @inject('NotesRepository')
    private noteRepository: NotesRepository,
  ) {}

  async execute({
    description,
    title,
    color,
    noteId,
    isFavorite,
  }: UpdateNoteUseCaseRequest) {
    const note = await this.noteRepository.findById(noteId)

    if (!note) {
      throw new ResourceNotFoundException()
    }

    note.description = description
    note.title = title
    note.color = color
    note.isFavorite = isFavorite

    await this.noteRepository.save(note)

    return note
  }
}
