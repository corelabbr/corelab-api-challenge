import Note from './note.model'

export const createNote = async body => {
  return await Note.create({
    title: body.title,
    text: body.text,
    isFavorite: false,
    color: body.color,
    createdDate: new Date()
  })
}
