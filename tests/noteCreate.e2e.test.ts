import supertest from 'supertest'
import server from '../src/configs/server'
import { NoteModel } from '../src/modules/notes/adapters/mongo/note.model'
import { makeCreateNoteBody } from './utils/note.factory'

describe('POST /notes', () => {
  const createdNotesIds: string[] = []

  afterEach(async () => {
    await Promise.all(
      createdNotesIds.map(async (noteId) =>
        NoteModel.findByIdAndDelete(noteId),
      ),
    )
  })

  it('should return status 201 and create a new note when pass correct body', async () => {
    const { note, expectedNoteResponse, expectedSavedNote } =
      makeCreateNoteBody()
    const { body } = await supertest(server)
      .post('/notes')
      .send(note)
      .expect(201)
    const savedNote = await NoteModel.findById(body.id)

    expect(savedNote).toBeTruthy()
    expect(savedNote?.toObject()).toEqual(expectedSavedNote)
    expect(body).toEqual(expectedNoteResponse)
    createdNotesIds.push(body.id)
  })

  it('should return status 400 when pass a body with invalid fields', async () => {
    const { note } = makeCreateNoteBody()
    await supertest(server)
      .post('/notes')
      .send({ ...note, isFavorite: 'true' })
      .expect(400)
  })
})
