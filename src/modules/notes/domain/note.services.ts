import { AppError } from '../../../errors/AppError'
import { createNoteDTO } from './dtos/createNoteDTO'
import { updateNoteDTO } from './dtos/updateNoteDTO'
import { Note } from './note.entity'
import { NoteRepository } from './note.repository'

export class NoteServices {
  constructor(private readonly noteRepository: NoteRepository) {}

  async createNote(createNoteDTO: createNoteDTO) {
    const createdNote = Note.create(createNoteDTO)
    return this.noteRepository.create(createdNote)
  }

  async updateNote(updateNoteDTO: updateNoteDTO & { id: string }) {
    const note = await this.noteRepository.findById(updateNoteDTO.id)
    if (!note) {
      throw AppError.notFound('Note not found')
    }

    note.update(updateNoteDTO)

    return this.noteRepository.update(note)
  }

  async deleteNote(id: string) {
    return this.noteRepository.delete(id)
  }

  async getNoteById(id: string) {
    const note = await this.noteRepository.findById(id)
    if (!note) {
      throw AppError.notFound('Note not found')
    }

    return note
  }

  async getAllNotes() {
    return this.noteRepository.findAll()
  }

  async getFavoritesNotes() {
    return this.noteRepository.findFavorites()
  }
}
