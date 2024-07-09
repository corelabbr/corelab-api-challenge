import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true }
})

export default mongoose.models.File || mongoose.model('File', FileSchema)
