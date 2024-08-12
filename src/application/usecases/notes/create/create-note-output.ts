import { NoteData } from "../../../../domain/entity/note";

export class CreateNoteOutput {
  constructor(readonly data: Omit<NoteData, 'user'>) {}
}