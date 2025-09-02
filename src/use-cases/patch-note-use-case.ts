import { inject, injectable } from 'tsyringe'
import { BadRequestException } from '../errors/bad-request'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { NotesRepository } from '../repositories/notes-repository'

type PatchNoteUseCaseRequest = {
  title?: string
  description?: string
  color?: string
  isFavorite?: boolean
  noteId: number
}

@injectable()
export class PatchNoteUseCase {
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
  }: PatchNoteUseCaseRequest) {
    const note = await this.noteRepository.findById(noteId)

    if (!note) {
      throw new ResourceNotFoundException()
    }

    if (!title && !color && isFavorite === undefined && !description) {
      throw new BadRequestException()
    }

    note.description = description ?? note.description
    note.title = title ?? note.title
    note.color = color ?? note.color
    note.isFavorite = isFavorite ?? note.isFavorite

    await this.noteRepository.save(note)

    return note
  }
}
