import { randomInt } from 'node:crypto'
import { Note } from '../../entities/note'
import { GetNotesRepository, NotesRepository } from '../notes-repository'

export class InMemoryNotesRepository implements NotesRepository {
  public db: Note[] = []

  async create(noteRaw: Note): Promise<Note> {
    const note = new Note(
      {
        color: noteRaw.color,
        isFavorite: noteRaw.isFavorite,
        description: noteRaw.description,
        title: noteRaw.title,
      },
      noteRaw.id ?? randomInt(0, 1000),
    )

    this.db.push(note)

    return note
  }

  async get({ search }: GetNotesRepository): Promise<Note[]> {
    const filteredNotes = this.db.filter((note) =>
      note.title.toLowerCase().includes(search.toLowerCase()),
    )

    return filteredNotes
  }

  async findById(noteId: number): Promise<Note | null> {
    const note = this.db.find((note) => note.id === noteId)

    if (!note) return null

    return note
  }

  async save(noteRaw: Note): Promise<Note> {
    const noteIndex = this.db.findIndex((note) => note.id === noteRaw.id)

    if (noteIndex) {
      this.db[noteIndex] = noteRaw
    }

    return noteRaw
  }

  async delete(noteId: number): Promise<void> {
    this.db = this.db.filter((note) => note.id !== noteId)
  }
}
