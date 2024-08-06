import { model, Schema } from 'mongoose'

const NoteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isFavorite: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  fileUrl: { type: String },
  color: { type: String },
})

export const NoteModel = model('Note', NoteSchema)
