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
export const editNote = async body => {
  return await Note.findOneAndUpdate(
    {
      _id: body.id
    },
    {
      title: body.title,
      text: body.text,
      color: body.color
    },
    {
      new: true
    }
  )
}
export const editFavoriteNote = async body => {
  return await Note.findOneAndUpdate(
    {
      _id: body.id
    },
    {
      isFavorite: body.isFavorite
    },
    {
      new: true
    }
  )
}
export const deleteNote = async id => {
  return await Note.findOneAndDelete({
    _id: id
  })
}
