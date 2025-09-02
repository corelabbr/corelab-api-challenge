import { beforeEach, describe, expect, it } from 'vitest'
import { MakeNote } from '../../test/factories/make-note'
import { BadRequestException } from '../errors/bad-request'
import { ResourceNotFoundException } from '../errors/resource-not-found'
import { InMemoryNotesRepository } from '../repositories/in-memory/in-memory-notes-repository'
import { PatchNoteUseCase } from './patch-note-use-case'

describe('Patch Note use Case', () => {
  let patchNoteUseCase: PatchNoteUseCase
  let notesRepository: InMemoryNotesRepository

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    patchNoteUseCase = new PatchNoteUseCase(notesRepository)
  })

  it('Should be able to partial Update the note', async () => {
    await notesRepository.create(
      MakeNote({
        id: 1,
      }),
    )

    const note = await patchNoteUseCase.execute({
      noteId: 1,
      description: 'Update text',
    })

    expect(note.id).toBe(1)
    expect(note.description).toBe('Update text')
  })

  it('Should not be able to Update the note if not exists note', async () => {
    await expect(
      patchNoteUseCase.execute({
        noteId: 1,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException)
  })
  it('Should not be able to Update the note if object is empty', async () => {
    await notesRepository.create(
      MakeNote({
        id: 1,
      }),
    )
    await expect(
      patchNoteUseCase.execute({
        noteId: 1,
      }),
    ).rejects.toBeInstanceOf(BadRequestException)
  })
})
