import CreateNoteUseCase from "../../application/usecases/notes/create/create-note";
import { CreateNoteInput } from "../../application/usecases/notes/create/create-note-input";
import { NotesRepository } from "../../domain/repository/notes-repository";
import { UsersRepository } from '../../domain/repository/users-repository';
import Controller from "./controller";

export default class CreateNoteHandler extends Controller{
  constructor(private readonly notesRepository: NotesRepository, private readonly usersRepository: UsersRepository) {
    super()
   }

  async execute(payload: CreateNoteInput): Promise<any> {
    const createNoteUseCase = new CreateNoteUseCase(this.notesRepository, this.usersRepository);
    return await createNoteUseCase.execute(payload);
  }
}
