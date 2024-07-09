import Note from './note.model'

export const createNote = async body => {
  return await Note.create({
    title: body.title,
    text: body.text,
    isFavorite: false,
    color: 'white',
    nameFile: '',
    src: '',
    createdDate: new Date()
  })
}
export const createFavoriteNote = async body => {
  return await Note.create({
    title: body.title,
    text: body.text,
    isFavorite: true,
    color: 'white',
    nameFile: '',
    src: '',
    createdDate: new Date()
  })
}
export const getNotes = async () => {
  try {
    const note = await Note.findOne({ isFavorite: false })

    if (!note) {
      throw new Error('Tarefas nâo encontradas')
    }

    const notes = await Note.find({ isFavorite: false }).sort({ createdDate: -1 })
    if (!notes) {
      throw new Error('Tarefas nâo encontradas')
    }
    return notes
  } catch (err) {
    throw err
  }
}
export const getFavoritesNotes = async () => {
  try {
    const note = await Note.findOne({ isFavorite: true })

    if (!note) {
      throw new Error('Tarefas favoritas nâo encontradas')
    }

    const notes = await Note.find({ isFavorite: true }).sort({ createdDate: -1 })

    if (!notes) {
      throw new Error('Tarefas favoritas nâo encontradas')
    }
    return notes
  } catch (err) {
    throw err
  }
}
export const getOneNote = async id => {
  return await Note.findOne({
    _id: id
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
export const editFile = async (body, file) => {
  return await Note.findOneAndUpdate(
    {
      _id: body.id
    },
    {
      nameFile: body.nameFile,
      src: file
    },
    {
      new: true
    }
  )
}
export const editFileToDelete = async body => {
  return await Note.findOneAndUpdate(
    {
      _id: body.id
    },
    {
      nameFile: body.nameFile,
      src: body.src
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
