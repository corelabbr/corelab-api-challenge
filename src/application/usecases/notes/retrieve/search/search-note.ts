import ApiError from '../../../../../domain/error/error';
import { NotesRepository } from "../../../../../domain/repository/notes-repository";
import { UsersRepository } from "../../../../../domain/repository/users-repository";
import { UseCase } from "../../../usecase";
import SearchNoteInput from "./search-note-input";
import SearchNoteOutput from "./search-note-output";

export default class SearchNoteUseCase implements UseCase<SearchNoteInput, SearchNoteOutput> {
  constructor(
    private readonly notesRepository: NotesRepository,
    private  readonly usersRepository: UsersRepository,
  ){ }
  async execute(data: SearchNoteInput): Promise<SearchNoteOutput> {
    const user = await this.usersRepository.findUserById(data.userId)
    if(!user) throw new ApiError(404, "User not found")
    try {
      const notes = await this.notesRepository.searchNotes(data.keywords, data.userId)
      const output = new SearchNoteOutput(
        notes.map(note => {
          if (note.getUser().getId() !== user.getId()) throw new ApiError(403, "Forbidden")
          return ({
            id: note.getId(),
            title: note.getTitle(),
            content: note.getContent(),
            color: note.getColor(),
            favorite: note.getFavorite(),
            createdAt: note.getCreatedAt(),
            updatedAt: note.getUpdatedAt()
          })
        })
      )
      return output
    } catch (error) {
      throw new ApiError(500, "Something went wrong")     
    }
  }
}
