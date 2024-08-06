import { Types } from 'mongoose'
import { Note } from '../../domain/note.entity'

type NoteMongoDocument = {
  _id: Types.ObjectId
  title: string
  content: string
  isFavorite: boolean
  createdAt: Date
  updatedAt: Date
  fileUrl?: string | null | undefined
  color?: string | null | undefined
}

export abstract class NoteMongoMapper {
  static toPersistence(note: Note<string> | Note<null>) {
    return {
      _id: note.id ? new Types.ObjectId(note.id) : undefined,
      title: note.title,
      content: note.content,
      isFavorite: note.isFavorite,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      fileUrl: note.fileUrl,
      color: note.color,
    }
  }

  static toEntity(noteModel: NoteMongoDocument): Note<string> {
    return Note.buildFromProps({
      id: noteModel._id.toHexString(),
      title: noteModel.title,
      content: noteModel.content,
      isFavorite: noteModel.isFavorite,
      createdAt: noteModel.createdAt,
      updatedAt: noteModel.updatedAt,
      fileUrl: noteModel.fileUrl || null,
      color: noteModel.color || null,
    })
  }
}
