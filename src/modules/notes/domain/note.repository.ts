import { Note } from './note.entity'

export interface NoteRepository {
  save(note: Note): Promise<Note>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Note | null>
  findAll(): Promise<Note[]>
}
