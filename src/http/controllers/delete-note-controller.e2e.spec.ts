import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('[DELETE-NOTE-CONTROLLER-E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a note', async () => {
    const createResponse = await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })

    const { id } = createResponse.body

    const response = await request(app.server).delete(`/notes/${id}`)

    expect(response.status).toBe(204)
  })
})
