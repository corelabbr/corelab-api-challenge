import { inject, injectable } from 'tsyringe'
import { NotesRepository } from '../repositories/notes-repository'

type GetNotesUseCaseRequest = {
  search: string
}

@injectable()
export class GetNotesUseCase {
  constructor(
    @inject('NotesRepository')
    private noteRepository: NotesRepository,
  ) {}

  async execute({ search }: GetNotesUseCaseRequest) {
    const notes = await this.noteRepository.get({ search })

    return notes
  }
}
