import { Types } from 'mongoose'
import { Note } from '../../domain/note.entity'
import { NoteRepository } from '../../domain/note.repository'
import { NoteModel } from './note.model'
import { NoteMongoMapper } from './note.mongo.mapper'

export class NoteMongoRepository implements NoteRepository {
  async create(note: Note<null>): Promise<Note<string>> {
    const persistenceNote = NoteMongoMapper.toPersistence(note)
    const noteId = new Types.ObjectId()

    const noteModel = new NoteModel({
      ...persistenceNote,
      _id: noteId,
    })

    await noteModel.save()

    return NoteMongoMapper.toEntity(noteModel)
  }

  async update(note: Note<string>): Promise<Note<string>> {
    const persistenceNote = NoteMongoMapper.toPersistence(note)
    await NoteModel.updateOne({ _id: note.id }, persistenceNote)

    const noteModel = await NoteModel.findById(note.id)

    if (!noteModel) {
      throw new Error('Note not found')
    }

    return NoteMongoMapper.toEntity(noteModel)
  }

  async delete(id: string): Promise<void> {
    await NoteModel.findByIdAndDelete(id)
  }

  async findById(id: string): Promise<Note<string> | null> {
    const noteModel = await NoteModel.findById(id)

    if (!noteModel) {
      return null
    }

    return NoteMongoMapper.toEntity(noteModel)
  }

  async findAll(): Promise<Note<string>[]> {
    const noteModels = await NoteModel.find()

    return noteModels.map((noteModel) => NoteMongoMapper.toEntity(noteModel))
  }

  async findFavorites(): Promise<Note<string>[]> {
    const noteModels = await NoteModel.find({ favorite: true })

    return noteModels.map((noteModel) => NoteMongoMapper.toEntity(noteModel))
  }
}
