import { NoteData } from "../../../../../domain/entity/note";

export default class GetNoteOutput {

  constructor(readonly data: Omit<NoteData, 'user'>) {}
}