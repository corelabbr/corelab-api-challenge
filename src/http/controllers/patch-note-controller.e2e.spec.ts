import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('[PATCH-NOTE-CONTROLLER-E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to patch the note', async () => {
    const createNoteResponse = await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })

    const { id } = createNoteResponse.body

    const response = await request(app.server).patch(`/notes/${id}`).send({
      description: 'Updated Text',
    })

    expect(response.status).toBe(200)
    expect(response.body).toMatchObject({
      description: 'Updated Text',
      id,
    })
  })

  it('should not be able to patch the note if not exists', async () => {
    const response = await request(app.server).patch('/notes/6').send({
      description: 'Text',
      title: 'Title',
      isFavorite: false,
      color: '#fff',
    })

    expect(response.status).toBe(404)
  })
})
