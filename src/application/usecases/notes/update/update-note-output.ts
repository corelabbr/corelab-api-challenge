import { NoteData } from "../../../../domain/entity/note";

export default class UpdateNoteOutput {
  constructor(private readonly data: Omit<NoteData, 'user'>) { }
}
