import UpdateNoteUseCase from "../../application/usecases/notes/update/update-note";
import UpdateNoteInput from "../../application/usecases/notes/update/update-note-input";
import { NotesRepository } from "../../domain/repository/notes-repository";
import { UsersRepository } from "../../domain/repository/users-repository";
import Controller from "./controller";

export default class UpdateNotesHandler extends Controller{
	constructor(
		private readonly notesRepository: NotesRepository,
		private readonly usersRepository: UsersRepository
	) { 
		super()
	}

	async execute(payload: UpdateNoteInput): Promise<any> {
		const updateNoteUsecase = new UpdateNoteUseCase(this.notesRepository, this.usersRepository)
		return await updateNoteUsecase.execute(payload)
	}

}
