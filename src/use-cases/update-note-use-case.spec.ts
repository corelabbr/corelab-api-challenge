import { beforeEach, describe, expect, it } from 'vitest'
import { MakeNote } from '../../test/factories/make-note'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { InMemoryNotesRepository } from '../repositories/in-memory/in-memory-notes-repository'
import { UpdateNoteUseCase } from './update-note-use-case'

describe('Update Note use Case', () => {
  let updateNoteUseCase: UpdateNoteUseCase
  let notesRepository: InMemoryNotesRepository

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    updateNoteUseCase = new UpdateNoteUseCase(notesRepository)
  })

  it('Should be able to Update the note', async () => {
    await notesRepository.create(
      MakeNote({
        id: 1,
      }),
    )

    const note = await updateNoteUseCase.execute({
      noteId: 1,
      description: 'Update text',
      title: 'Update title',
      color: '#fff',
      isFavorite: false,
    })

    expect(note.id).toBe(1)
    expect(note.description).toBe('Update text')
    expect(note.title).toBe('Update title')
    expect(note.color).toBe('#fff')
    expect(note.isFavorite).toBe(false)
  })

  it('Should not be able to Update the note if not exists note', async () => {
    await expect(
      updateNoteUseCase.execute({
        noteId: 1,
        description: 'Update text',
        title: 'Update title',
        color: '#fff',
        isFavorite: false,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
})
