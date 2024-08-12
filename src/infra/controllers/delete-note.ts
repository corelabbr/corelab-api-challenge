import DeleteNoteUseCase from "../../application/usecases/notes/delete/delete-note";
import DeleteNoteInput from "../../application/usecases/notes/delete/delete-note-input";
import { NotesRepository } from "../../domain/repository/notes-repository";
import { UsersRepository } from "../../domain/repository/users-repository";
import Controller from "./controller";

export default class DeleteNoteHandler extends Controller {
  constructor(private readonly notesRepository: NotesRepository, private readonly usersRepository: UsersRepository) {
    super()
   }

  async execute(payload: DeleteNoteInput): Promise<void> {
    const deleteNoteUseCase = new DeleteNoteUseCase(this.notesRepository, this.usersRepository)
    return await deleteNoteUseCase.execute(payload)
  }
}