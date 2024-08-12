import GetNoteInput from "@/application/usecases/notes/retrieve/get/get-note-input";
import GetNoteUseCase from "../../application/usecases/notes/retrieve/get/get-note";
import { NotesRepository } from "../../domain/repository/notes-repository";
import Controller from "./controller";

export default class GetNoteHandler extends Controller{
  constructor(private readonly notesRepository: NotesRepository) {
    super()
  }

  async execute(payload: GetNoteInput): Promise<any> {
    const getNoteUseCase = new GetNoteUseCase(this.notesRepository);
    return await getNoteUseCase.execute(payload);
  }
}
