import { createNoteDTO } from './dtos/createNoteDTO'
import { Note, noteProps } from './note.entity'

describe('Note entity test suite', () => {
  let createNoteProps: createNoteDTO
  let constructorProps: noteProps<unknown>

  beforeEach(() => {
    createNoteProps = {
      title: 'any_title',
      content: 'any_content',
      isFavorite: false,
      fileUrl: 'any_file_url',
      color: 'any_color',
    }

    constructorProps = {
      ...createNoteProps,
      id: 'any_id',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })

  describe('Contructor', () => {
    it('should create a new Note instance when pass correct props', () => {
      const note = new Note(constructorProps)

      expect(note).toBeInstanceOf(Note)
      expect(note.props).toEqual(constructorProps)
    })

    it('should create with null color', () => {
      constructorProps.color = null
      const note = new Note(constructorProps)

      expect(note.props.color).toBeNull()
    })

    it('should create with null fileUrl', () => {
      constructorProps.fileUrl = null
      const note = new Note(constructorProps)

      expect(note.props.fileUrl).toBeNull()
    })

    it('should create with null id', () => {
      constructorProps.id = null
      const note = new Note(constructorProps)

      expect(note.props.id).toBeNull()
    })
  })

  describe('create method', () => {
    it('should create a new Note instance with null id', () => {
      const note = Note.create(createNoteProps)

      expect(note).toBeInstanceOf(Note)
      expect(note.props.id).toBeNull()
    })

    it('should create a new Note instance with createdAt and updatedAt', () => {
      const note = Note.create(createNoteProps)

      expect(note.props.createdAt).toBeInstanceOf(Date)
      expect(note.props.updatedAt).toBeInstanceOf(Date)
    })

    it('should create a new Note instance witout fileUrl', () => {
      createNoteProps.fileUrl = null
      const note = Note.create(createNoteProps)

      expect(note.props.fileUrl).toBeNull()
    })

    it('should create a new Note instance without color', () => {
      createNoteProps.color = null
      const note = Note.create(createNoteProps)

      expect(note.props.color).toBe(createNoteProps.color)
    })

    it('should create a new Note instance with correct props', () => {
      const note = Note.create(createNoteProps)

      expect(note.props).toEqual({
        ...createNoteProps,
        id: null,
        createdAt: note.props.createdAt,
        updatedAt: note.props.updatedAt,
      })
    })
  })

  describe('update method', () => {
    it('should update one prop ', () => {
      const note = new Note(constructorProps)
      const newTitle = 'new_title'
      note.update({ title: newTitle })

      expect(note.props.title).toBe(newTitle)
    })

    it('should update more than one prop at same', () => {
      const note = new Note(constructorProps)
      const newTitle = 'new_title'
      const newContent = 'new_content'
      note.update({ title: newTitle, content: newContent })

      expect(note.props.title).toBe(newTitle)
      expect(note.props.content).toBe(newContent)
    })

    it('should not update prop when pass undefined', () => {
      const note = new Note(constructorProps)
      const newTitle = 'new_title'
      note.update({ title: newTitle, content: undefined })

      expect(note.props.title).toBe(newTitle)
      expect(note.props.content).toBe(constructorProps.content)
    })

    it('should update color when pass null', () => {
      const note = new Note({ ...constructorProps, color: 'any_color' })
      note.update({ color: null })

      expect(note.props.color).toBeNull()
    })

    it('should not update color to null when pass undefined', () => {
      const expectedColor = 'any_color'
      const note = new Note({ ...constructorProps, color: expectedColor })
      note.update({ color: undefined })

      expect(note.props.color).toBe(expectedColor)
    })

    it('should update fileUrl when pass null', () => {
      const note = new Note({ ...constructorProps, fileUrl: 'any_file_url' })
      note.update({ fileUrl: null })

      expect(note.props.fileUrl).toBeNull()
    })

    it('should not update fileUrl to null when pass undefined', () => {
      const expectedFileUrl = 'any_file_url'
      const note = new Note({ ...constructorProps, fileUrl: expectedFileUrl })
      note.update({ fileUrl: undefined })

      expect(note.props.fileUrl).toBe(expectedFileUrl)
    })

    it('should update updatedAt when pass any prop', () => {
      const updatedAt = new Date('2021-09-01')
      const note = new Note({ ...constructorProps, updatedAt })
      note.update({ title: 'new_title' })

      expect(note.props.updatedAt).toBeInstanceOf(Date)
      expect(note.props.updatedAt.getTime()).toBeGreaterThan(
        updatedAt.getTime(),
      )
    })
  })

  describe('toJSON method', () => {
    it('should return correct props', () => {
      const note = new Note(constructorProps)
      const json = note.toJSON()

      expect(json).toEqual(constructorProps)
    })
  })

  describe('cloneWith method', () => {
    it('should return a new instance with new props', () => {
      const note = new Note(constructorProps)
      const newTitle = 'new_title'
      const newContent = 'new_content'
      const newNote = note.cloneWith({ title: newTitle, content: newContent })

      expect(newNote).toBeInstanceOf(Note)
      expect(newNote.props).toEqual({
        ...constructorProps,
        title: newTitle,
        content: newContent,
      })
    })
  })

  describe('buildFromProps method', () => {
    it('should return a new instance with props', () => {
      const props: noteProps<string> = {
        ...constructorProps,
        id: 'any_id',
      }

      const note = Note.buildFromProps(props)

      expect(note).toBeInstanceOf(Note)
      expect(note.props).toEqual(props)
    })

    it('should throw an error when pass null id', () => {
      const props: noteProps<string> = {
        ...constructorProps,
        id: null as unknown as string,
      }

      expect(() => Note.buildFromProps(props)).toThrow()
    })
  })

  describe('getters', () => {
    it('should return correct values', () => {
      const note = new Note(constructorProps)

      expect(note.id).toBe(constructorProps.id)
      expect(note.title).toBe(constructorProps.title)
      expect(note.content).toBe(constructorProps.content)
      expect(note.isFavorite).toBe(constructorProps.isFavorite)
      expect(note.fileUrl).toBe(constructorProps.fileUrl)
      expect(note.color).toBe(constructorProps.color)
      expect(note.createdAt).toBe(constructorProps.createdAt)
      expect(note.updatedAt).toBe(constructorProps.updatedAt)
    })
  })

  describe('setters', () => {
    it('should set correct values', () => {
      const note = new Note(constructorProps)
      const newId = 'new_id'
      const newTitle = 'new_title'
      const newContent = 'new_content'
      const newIsFavorite = true
      const newFileUrl = 'new_file_url'
      const newColor = 'new_color'
      const newCreatedAt = new Date('2021-09-01')
      const newUpdatedAt = new Date('2021-09-01')

      note.id = newId
      note.title = newTitle
      note.content = newContent
      note.isFavorite = newIsFavorite
      note.fileUrl = newFileUrl
      note.color = newColor
      note.createdAt = newCreatedAt
      note.updatedAt = newUpdatedAt

      expect(note.id).toBe(newId)
      expect(note.title).toBe(newTitle)
      expect(note.content).toBe(newContent)
      expect(note.isFavorite).toBe(newIsFavorite)
      expect(note.fileUrl).toBe(newFileUrl)
      expect(note.color).toBe(newColor)
      expect(note.createdAt).toBe(newCreatedAt)
      expect(note.updatedAt).toBe(newUpdatedAt)
    })
  })
})
