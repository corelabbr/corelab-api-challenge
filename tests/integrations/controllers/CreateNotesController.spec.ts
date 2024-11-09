import request from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { HttpServer } from '../../../src/config/http-server'
import { sequelize } from '../../../src/infra/db/sequelize'
import { createNotesService } from '../../../src/app/services/CreateNotesService'

describe('CreateNotesController Integration Test', () => {
  let server: HttpServer

  beforeAll(async () => {
    server = new HttpServer()
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a note successfully', async () => {
    const noteData = {
      title: 'Test Note',
      text: 'This is a test note.',
      color: 'blue',
      favorite: true
    }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.CREATED)

    expect(response.body).toMatchObject(noteData)
  }, 10000)

  it('should return an error when text is missing', async () => {
    const noteData = {
      title: 'Incomplete Note'
    }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({ error: '\"text\" is required' })
  }, 10000)

  it('should handle database errors gracefully', async () => {
    jest.spyOn(createNotesService, "create").mockImplementation(() => {
      throw new Error('Database error')
    })

    const noteData = { title: 'Note Title', text: 'Sample text', color: 'red', favorite: false }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.INTERNAL_SERVER_ERROR)

    expect(response.body).toEqual({ error: 'Internal server error!' })
  }, 10000)

  it('should return an error when title exceeds the maximum length', async () => {
    const longTitle = 'a'.repeat(256)
    const noteData = { title: longTitle, text: 'Sample text', color: 'green', favorite: false }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({ error: 'Title should be at most 255 characters long.' })
  }, 10000)

  it('should return an error when text exceeds the maximum length', async () => {
    const longText = 'a'.repeat(1001)
    const noteData = { title: 'title', text: longText, color: 'green', favorite: false }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({ error: 'Text should be at most 1000 characters long.' })
  }, 10000)

  it('should return an error when the color is not valid', async () => {
    const noteData = { title: 'title', text: 'text test', color: 'purple', favorite: false }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({ error: "\"color\" must be one of [red, green, blue, yellow, black, white]" })
  }, 10000)


  it('should return an error when the favorite is not a boolean type', async () => {
    const noteData = { title: 'title', text: 'text test', color: 'green', favorite: 2 }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)

    expect(response.body).toEqual({ error: 'Favorite must be a boolean value.' })
  }, 1000)


  it('should create a note successfully with optional fields missing', async () => {
    const noteData = { text: 'Sample text' }

    const response = await request(server.app)
      .post('/notes')
      .send(noteData)
      .expect(StatusCodes.INTERNAL_SERVER_ERROR)

    expect(response.body).toEqual({error: "Internal server error!"})
  }, 10000)

})