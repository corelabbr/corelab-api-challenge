import { z } from 'zod'
import { createNoteBodySchema } from '../../src/modules/notes/zod.schemas'
import { Types } from 'mongoose'

export const makeCreateNoteBody = (
  override: Partial<z.infer<typeof createNoteBodySchema>> = {},
) => {
  const note = {
    title: 'Note title',
    content: 'Note content',
    isFavorite: true,
    fileUrl: 'http://example.com',
    color: '#dedede',
    ...override,
  }

  const expectedNoteResponse = {
    ...note,
    id: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  }

  const expectedSavedNote = {
    ...note,
    _id: expect.any(Types.ObjectId),
    __v: expect.any(Number),
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  }

  return {
    note,
    expectedNoteResponse,
    expectedSavedNote,
  }
}
