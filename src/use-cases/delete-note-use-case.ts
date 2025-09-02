import { inject, injectable } from 'tsyringe'
import { NotesRepository } from '../repositories/notes-repository'

type DeleteNoteUseCaseRequest = {
  noteId: number
}

@injectable()
export class DeleteNoteUseCase {
  constructor(
    @inject('NotesRepository')
    private noteRepository: NotesRepository,
  ) {}

  async execute({ noteId }: DeleteNoteUseCaseRequest) {
    await this.noteRepository.delete(noteId)
  }
}
