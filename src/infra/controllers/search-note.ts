import SearchNoteUseCase from "../../application/usecases/notes/retrieve/search/search-note";
import SearchNoteInput from "../../application/usecases/notes/retrieve/search/search-note-input";
import { NotesRepository } from "../../domain/repository/notes-repository";
import { UsersRepository } from "../../domain/repository/users-repository";
import Controller from "./controller";

export default class SearchNoteHandler extends Controller {
  constructor(
		private readonly notesRepository: NotesRepository,
		private readonly usersRepository: UsersRepository
  ){
    super()
  }
  async execute(payload: SearchNoteInput) {
    const searchNoteUseCase = new SearchNoteUseCase(this.notesRepository, this.usersRepository)
    return await searchNoteUseCase.execute(payload)
  }
}