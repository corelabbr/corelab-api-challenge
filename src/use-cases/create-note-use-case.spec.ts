import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryNotesRepository } from '../repositories/in-memory/in-memory-notes-repository'
import { CreateNoteUseCase } from './create-note-use-case'

describe('Create Note use Case', () => {
  let createNoteUseCase: CreateNoteUseCase
  let notesRepository: InMemoryNotesRepository

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    createNoteUseCase = new CreateNoteUseCase(notesRepository)
  })

  it('Should be able to create a note', async () => {
    const sut = await createNoteUseCase.execute({
      color: '#dad',
      isFavorite: false,
      description: 'Note text',
      title: 'Note title',
    })

    expect(sut.color).toBe('#dad')
    expect(sut.isFavorite).toBe(false)
    expect(sut.description).toBe('Note text')
    expect(sut.title).toBe('Note title')
  })
})
