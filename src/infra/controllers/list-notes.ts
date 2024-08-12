import ListNotesInput from "@/application/usecases/notes/retrieve/list/list-notes-input";
import ListNotesUseCase from "../../application/usecases/notes/retrieve/list/list-notes";
import { NotesRepository } from "../../domain/repository/notes-repository";
import Controller from "./controller";

export default class ListNoteHandler extends Controller {
  constructor(private readonly notesRepository: NotesRepository) {
    super()
  }

  async execute(payload: ListNotesInput): Promise<any> {
    const getNoteUseCase = new ListNotesUseCase(this.notesRepository);
    return await getNoteUseCase.execute(payload);
  }
}