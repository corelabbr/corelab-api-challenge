import File from './file.model'

export const createFile = async (body, file) => {
  return await File.create({
    name: body.name,
    src: file
  })
}
export const getFiles = async () => {
  const file = await File.findOne({ name: String })

  if (!file) {
    throw new Error('Arquivo não encontrado')
  }

  const files = await File.find()

  if (!files) {
    throw new Error('Arquivos não encontrados')
  }
  return notes
}

export const deleteFile = async id => {
  return await File.findOneAndDelete({
    _id: id
  })
}
