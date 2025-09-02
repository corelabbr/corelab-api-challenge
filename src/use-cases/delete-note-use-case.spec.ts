import { beforeEach, describe, expect, it } from 'vitest'
import { MakeNote } from '../../test/factories/make-note'
import { InMemoryNotesRepository } from '../repositories/in-memory/in-memory-notes-repository'
import { DeleteNoteUseCase } from './delete-note-use-case'

describe('Delete Note use Case', () => {
  let deleteNoteUseCase: DeleteNoteUseCase
  let notesRepository: InMemoryNotesRepository

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    deleteNoteUseCase = new DeleteNoteUseCase(notesRepository)
  })

  it('Should be able to delete the note', async () => {
    await notesRepository.create(MakeNote({ id: 1 }))
    await notesRepository.create(MakeNote({ id: 2 }))

    await deleteNoteUseCase.execute({ noteId: 1 })

    expect(notesRepository.db.length).toBe(1)
    expect(notesRepository.db[0].id).toBe(2)
  })
})
