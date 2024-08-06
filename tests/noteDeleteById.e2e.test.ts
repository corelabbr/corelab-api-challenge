import supertest from 'supertest'
import server from '../src/configs/server'
import { NoteModel } from '../src/modules/notes/adapters/mongo/note.model'

describe('DELETE /notes/:id', () => {
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

  it('should return status 204 when pass a valid id', async () => {
    await supertest(server).delete(`/notes/${createdNoteId}`).expect(204)
  })
})
