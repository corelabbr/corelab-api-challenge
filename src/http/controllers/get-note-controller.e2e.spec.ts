import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../../app'

describe('[GET-NOTE-CONTROLLER-E2E]', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the notes', async () => {
    await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })
    await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })
    await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Title',
      color: '#fff',
      isFavorite: false,
    })

    const response = await request(app.server).get('/notes')

    expect(response.status).toBe(200)
    expect(response.body.notes).toHaveLength(3)

    expect(response.body).toMatchObject({
      notes: expect.arrayContaining([
        expect.objectContaining({
          description: expect.anything(),
          title: expect.anything(),
          isFavorite: expect.anything(),
          color: expect.anything(),
          id: expect.anything(),
        }),
      ]),
    })
  })

  it('should be able to get the notes by search query string', async () => {
    await request(app.server).post('/notes').send({
      title: 'Notes 1',
      description: 'Text',
      color: '#fff',
      isFavorite: false,
    })
    await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Notes 2',
      color: '#fff',
      isFavorite: false,
    })
    await request(app.server).post('/notes').send({
      description: 'Text',
      title: 'Notes 3',
      color: '#fff',
      isFavorite: false,
    })

    const response = await request(app.server).get('/notes?search=notes 1')

    expect(response.status).toBe(200)
    expect(response.body.notes).toHaveLength(1)

    expect(response.body).toMatchObject({
      notes: [
        {
          title: 'Notes 1',
          description: 'Text',
          color: '#fff',
          isFavorite: false,
          id: expect.anything(),
        },
      ],
    })
  })
})
