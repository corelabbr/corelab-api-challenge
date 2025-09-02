import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('[CREATE-NOTE-CONTROLLER-E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new note', async () => {
    const response = await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })

    expect(response.status).toBe(201)
    expect(response.body).toMatchObject({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
      id: expect.anything(),
    })
  })

  it('should be able to create a new note if body is invalid', async () => {
    const response = await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      isFavorite: false,
    })

    expect(response.status).toBe(400)
  })
})
