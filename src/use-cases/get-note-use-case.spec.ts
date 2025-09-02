import { beforeEach, describe, expect, it } from 'vitest'
import { MakeNote } from '../../test/factories/make-note'
import { InMemoryNotesRepository } from '../repositories/in-memory/in-memory-notes-repository'
import { GetNotesUseCase } from './get-notes-use-case'

describe('Get Note use Case', () => {
  let getNotesUseCase: GetNotesUseCase
  let notesRepository: InMemoryNotesRepository

  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    getNotesUseCase = new GetNotesUseCase(notesRepository)
  })

  it('Should be able to get the notes', async () => {
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())

    const notes = await getNotesUseCase.execute({ search: '' })

    expect(notes.length).toBe(5)
  })

  it('Should be able to get the notes by search filter', async () => {
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())
    await notesRepository.create(MakeNote())
    await notesRepository.create(
      MakeNote({
        title: 'Atividade',
      }),
    )

    const notes = await getNotesUseCase.execute({ search: 'Atividade' })

    expect(notes.length).toBe(1)
  })
  it('Should be able to get empty notes', async () => {
    const notes = await getNotesUseCase.execute({ search: '' })

    expect(notes.length).toBe(0)
  })
})
