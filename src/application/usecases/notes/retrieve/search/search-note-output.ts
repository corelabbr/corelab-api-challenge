import { NoteData } from "../../../../../domain/entity/note";

export default class SearchNoteOutput {
  constructor(
    public readonly notes: Omit<NoteData, "user">[],
  ) {}
}