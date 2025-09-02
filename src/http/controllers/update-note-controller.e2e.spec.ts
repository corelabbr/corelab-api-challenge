import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('[UPDATE-NOTE-CONTROLLER-E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update the note', async () => {
    const createNoteResponse = await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })

    const { id } = createNoteResponse.body

    const response = await request(app.server).put(`/notes/${id}`).send({
      description: 'Updated Text',
      title: 'Updated Title',
      color: '#fff',
      isFavorite: true,
    })

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      description: 'Updated Text',
      title: 'Updated Title',
      color: '#fff',
      isFavorite: true,
      id,
    })
  })

  it('should not be able to update the note if not exists', async () => {
    const response = await request(app.server).put('/notes/6').send({
      description: 'Text',
      title: 'Title',
      isFavorite: false,
      color: '#fff',
    })

    expect(response.status).toBe(404)
  })
})
