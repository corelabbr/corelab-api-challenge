import path from 'path'
import { Types } from 'mongoose'
import supertest from 'supertest'
import server from '../src/configs/server'
import { NoteModel } from '../src/modules/notes/adapters/mongo/note.model'

describe('PUT /notes/:noteId/add-file', () => {
  let noteId: string
  const filename = 'image-mock.jpg'
  const absolutePath = path.resolve(__dirname, 'mocks', filename)

  beforeEach(async () => {
    const note = await NoteModel.create({
      title: 'Note title',
      description: 'Note description',
      favorite: false,
      content: 'Note content',
      updatedAt: new Date(),
      createdAt: new Date(),
      isFavorite: false,
      color: '',
    })
    noteId = note._id.toString()
  })

  afterEach(async () => {
    await supertest(server).delete(`/notes/${noteId}`)
  })

  it('should return status 200 and add a file to a note when pass correct body', async () => {
    await supertest(server)
      .put(`/notes/${noteId}/add-file`)
      .attach('file', absolutePath)
    expect(200)
  })

  it('should return status 400 when not pass file', async () => {
    await supertest(server).put(`/notes/${noteId}/add-file`).expect(400)
  })

  it('should return status 400 when pass an invalid noteId', async () => {
    await supertest(server)
      .put(`/notes/invalid-note-id/add-file`)
      .attach('file', absolutePath)
      .expect(400)
  })

  it('should return status 404 when pass a noteId that not exists', async () => {
    await supertest(server)
      .put(`/notes/${new Types.ObjectId()}/add-file`)
      .attach('file', absolutePath)
      .expect(404)
  })
})
