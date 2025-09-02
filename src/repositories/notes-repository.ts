import { Note } from '../entities/note'

export type GetNotesRepository = {
  search: string
}

export interface NotesRepository {
  create(note: Note): Promise<Note>
  save(note: Note): Promise<Note>
  findById(noteId: number): Promise<Note | null>
  delete(noteId: number): Promise<void>
  get(filter: GetNotesRepository): Promise<Note[]>
}
