import { AppError } from '../../../errors/AppError'
import { createNoteDTO } from './dtos/createNoteDTO'
import { updateNoteDTO } from './dtos/updateNoteDTO'
import { Note } from './note.entity'
import { NoteRepository } from './note.repository'
import { NoteServices } from './note.services'

describe('NoteServices', () => {
  let sut: NoteServices
  let noteRepositoryMock: jest.Mocked<NoteRepository>
  let createNoteDTO: createNoteDTO
  let mockedDate: Date

  beforeEach(() => {
    noteRepositoryMock = {
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      findFavorites: jest.fn(),
    } as jest.Mocked<NoteRepository>
    mockedDate = new Date()
    jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)

    sut = new NoteServices(noteRepositoryMock)

    createNoteDTO = {
      content: 'any_content',
      title: 'any_title',
      color: 'any_color',
      fileUrl: 'any_fileUrl',
      isFavorite: false,
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('createNote', () => {
    it('should call repository create method with correct params', async () => {
      await sut.createNote(createNoteDTO)

      const expected = new Note({
        ...createNoteDTO,
        id: null,
        createdAt: mockedDate,
        updatedAt: mockedDate,
      })

      expect(noteRepositoryMock.create).toHaveBeenCalledTimes(1)
      expect(noteRepositoryMock.create).toHaveBeenCalledWith(expected)
    })

    it('should return the repository created note', async () => {
      const expected = new Note({
        ...createNoteDTO,
        id: 'any_id',
        createdAt: mockedDate,
        updatedAt: mockedDate,
      })

      noteRepositoryMock.create.mockResolvedValue(expected)

      const result = await sut.createNote(createNoteDTO)

      expect(result).toEqual(expected)
    })
  })

  describe('updateNote', () => {
    describe('when note does exists', () => {
      let savedNote: Note<string>
      beforeEach(() => {
        savedNote = new Note({
          ...createNoteDTO,
          id: 'any_id',
          createdAt: mockedDate,
          updatedAt: mockedDate,
        })
        noteRepositoryMock.findById.mockResolvedValue(savedNote)
      })

      it('should call repository update method with correct params', async () => {
        const updatedContent = 'updated_content'

        await sut.updateNote({
          id: 'any_id',
          ...createNoteDTO,
          content: updatedContent,
        })

        const expected = new Note({
          ...createNoteDTO,
          content: updatedContent,
          id: 'any_id',
          createdAt: mockedDate,
          updatedAt: mockedDate,
        })

        expect(noteRepositoryMock.update).toHaveBeenCalledTimes(1)
        expect(noteRepositoryMock.update).toHaveBeenCalledWith(expected)
      })

      it('should return the repository updated note', async () => {
        const updatedContent = 'updated_content'
        const expected = new Note({
          ...createNoteDTO,
          content: updatedContent,
          id: 'any_id',
          createdAt: mockedDate,
          updatedAt: mockedDate,
        })

        noteRepositoryMock.update.mockResolvedValue(expected)

        const result = await sut.updateNote({} as updateNoteDTO)

        expect(result).toEqual(expected)
      })

      it('should pass updated note with correct updatedAt', async () => {
        const updatedContent = 'updated_content'

        const expected = new Note({
          ...createNoteDTO,
          content: updatedContent,
          id: 'any_id',
          createdAt: mockedDate,
          updatedAt: mockedDate,
        })

        noteRepositoryMock.findById.mockResolvedValueOnce(
          savedNote.cloneWith({ updatedAt: {} as Date }),
        )

        await sut.updateNote({
          id: 'any_id',
          ...createNoteDTO,
          content: updatedContent,
        })

        expect(noteRepositoryMock.update).toHaveBeenCalledTimes(1)
        expect(noteRepositoryMock.update).toHaveBeenCalledWith(expected)
      })

      it('should update only the provided fields', async () => {
        const updatedContent = 'updated_content'

        const expected = new Note({
          ...createNoteDTO,
          content: updatedContent,
          id: 'any_id',
          createdAt: mockedDate,
          updatedAt: mockedDate,
        })

        await sut.updateNote({
          id: 'any_id',
          content: updatedContent,
        })

        expect(noteRepositoryMock.update).toHaveBeenCalledTimes(1)
        expect(noteRepositoryMock.update).toHaveBeenCalledWith(expected)
      })
    })

    describe('when note does not exists', () => {
      it('should throw an AppError with status 404', async () => {
        noteRepositoryMock.findById.mockResolvedValueOnce(null)

        await expect(sut.updateNote({ id: 'any_id' })).rejects.toMatchObject(
          AppError.notFound('Note not found'),
        )
      })
    })
  })

  describe('deleteNote', () => {
    it('should call repository delete method with correct params', async () => {
      await sut.deleteNote('any_id')

      expect(noteRepositoryMock.delete).toHaveBeenCalledTimes(1)
      expect(noteRepositoryMock.delete).toHaveBeenCalledWith('any_id')
    })
  })

  describe('getNoteById', () => {
    let savedNote: Note<string>
    beforeEach(() => {
      savedNote = new Note({
        ...createNoteDTO,
        id: 'any_id',
        createdAt: mockedDate,
        updatedAt: mockedDate,
      })

      noteRepositoryMock.findById.mockResolvedValue(savedNote)
    })

    it('should call repository findById method with correct params', async () => {
      const expected = 'any_id'
      sut.getNoteById(expected)

      expect(noteRepositoryMock.findById).toHaveBeenCalledTimes(1)
      expect(noteRepositoryMock.findById).toHaveBeenCalledWith(expected)
    })

    it('should return the repository found note', async () => {
      const result = await sut.getNoteById('any_id')

      expect(result).toEqual(savedNote)
    })

    it('should throw an AppError with status 404 when note does not exists', async () => {
      noteRepositoryMock.findById.mockResolvedValueOnce(null)

      await expect(sut.getNoteById('any_id')).rejects.toMatchObject(
        AppError.notFound('Note not found'),
      )
    })
  })

  describe('getAllNotes', () => {
    it('should call repository findAll method', async () => {
      await sut.getAllNotes()

      expect(noteRepositoryMock.findAll).toHaveBeenCalledTimes(1)
    })

    it('should return the repository found notes', async () => {
      const expected = 'repository_return'
      noteRepositoryMock.findAll.mockResolvedValue(
        expected as unknown as Note<string>[],
      )

      const result = await sut.getAllNotes()

      expect(result).toEqual(expected)
    })
  })

  describe('getFavoritesNotes', () => {
    it('should call repository findFavorites method', async () => {
      await sut.getFavoritesNotes()

      expect(noteRepositoryMock.findFavorites).toHaveBeenCalledTimes(1)
    })

    it('should return the repository found favorite notes', async () => {
      const expected = 'repository_return'
      noteRepositoryMock.findFavorites.mockResolvedValue(
        expected as unknown as Note<string>[],
      )

      const result = await sut.getFavoritesNotes()

      expect(result).toEqual(expected)
    })
  })
})
