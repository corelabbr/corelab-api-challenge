import Note from "../entity/note";

export interface NotesRepository {
  create(note: Note): Promise<Note>
  get(noteId: string, userId: string): Promise<Note | undefined>
  list(noteIds: string[], userId: string): Promise<Note[]>
  update(note: Note): Promise<Note>
  delete(note: Note): Promise<void>
  bulkDelete(noteIds: string[], userId: string): Promise<void>
  searchNotes(keywords: string, userId: string): Promise<Note[]>
}
