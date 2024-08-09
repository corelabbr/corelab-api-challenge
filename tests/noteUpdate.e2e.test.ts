import supertest from 'supertest'
import { NoteModel } from '../src/modules/notes/adapters/mongo/note.model'
import server from '../src/configs/server'
import { Types } from 'mongoose'

describe('PUT /notes/:id', () => {
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

  it('should return status 200 and update a note when pass correct body', async () => {
    const newTitle = 'Updated title'
    const { body } = await supertest(server)
      .put(`/notes/${createdNoteId}`)
      .send({
        title: newTitle,
      })
      .expect(200)
    const savedNote = await NoteModel.findById(createdNoteId)

    expect(savedNote?.title).toBe(newTitle)
    expect(body.title).toBe(newTitle)
  })

  it('should return status 404 when pass an invalid id', async () => {
    await supertest(server)
      .put(`/notes/${new Types.ObjectId()}`)
      .send({
        title: 'Updated title',
      })
      .expect(404)
  })

  it('should return status 400 when pass an invalid body', async () => {
    await supertest(server)
      .put(`/notes/${createdNoteId}`)
      .send({
        title: 123,
      })
      .expect(400)
  })
})
