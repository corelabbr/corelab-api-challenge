import { NoteData } from "../../../../../domain/entity/note";

export default class ListNotesOutput {
  constructor (readonly data: Omit<NoteData, 'user'>[]) {}
}