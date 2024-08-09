import { Note } from './note.entity'

export interface NoteRepository {
  create(note: Note<null>): Promise<Note<string>>
  update(note: Note<string>): Promise<Note<string>>
  delete(id: string): Promise<void>
  findById(id: string): Promise<Note<string> | null>
  findAll(): Promise<Note<string>[]>
  findFavorites(): Promise<Note<string>[]>
}
