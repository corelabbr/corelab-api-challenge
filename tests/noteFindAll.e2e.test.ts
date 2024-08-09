import supertest from 'supertest'
import { NoteModel } from '../src/modules/notes/adapters/mongo/note.model'
import server from '../src/configs/server'

describe('GET /notes', () => {
  let createdNoteIds: string[]

  afterEach(async () => {
    await Promise.all(
      createdNoteIds.map((id) => NoteModel.findByIdAndDelete(id)),
    )
  })

  it('should return status 200 and all notes when there are notes', async () => {
    const note = await NoteModel.create({
      title: 'Note title',
      content: 'Note content',
      isFavorite: true,
      fileUrl: 'http://example.com',
      color: '#dedede',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const note2 = await NoteModel.create({
      title: 'Note title 2',
      content: 'Note content 2',
      isFavorite: false,
      fileUrl: 'http://example.com',
      color: '#dedede',
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    createdNoteIds = [note.id, note2.id]

    const { body } = await supertest(server).get('/notes').expect(200)

    expect(body.length >= 2).toBe(true)
  })
})
