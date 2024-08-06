import { Types } from 'mongoose'
import supertest from 'supertest'
import server from '../src/configs/server'
import { NoteModel } from '../src/modules/notes/adapters/mongo/note.model'

describe('GET /notes/:id', () => {
  let createdNoteId: string

  beforeEach(async () => {
    const note = await NoteModel.create({
      title: 'Note title',
      content: 'Note content',
      isFavorite: true,
      fileUrl: 'http://example.com',
      color: '#dedede',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    createdNoteId = note.id
  })

  afterEach(async () => {
    await NoteModel.findByIdAndDelete(createdNoteId)
  })

  it('should return status 200 and a note when pass a valid id', async () => {
    const { body } = await supertest(server)
      .get(`/notes/${createdNoteId}`)
      .expect(200)

    expect(body.id).toBe(createdNoteId)
  })

  it('should return status 404 when pass an invalid id', async () => {
    await supertest(server).get(`/notes/${new Types.ObjectId()}`).expect(404)
  })
})
