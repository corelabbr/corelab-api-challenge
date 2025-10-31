import { test } from '@japa/runner'
import supertest from 'supertest'

const request = supertest('http://localhost:3333')

test.group('Tasks API', () => {
  let createdId: number

  test('should create a task', async ({ assert }) => {
    const res = await request.post('/tasks').send({
      title: 'Test Task',
      description: 'Test Desc',
      color: '#ffffff',
    })
    assert.equal(res.status, 201)
    assert.equal(res.body.title, 'Test Task')
    createdId = res.body.id
  })

  test('should list tasks', async ({ assert }) => {
    const res = await request.get('/tasks')
    assert.equal(res.status, 200)
    assert.isArray(res.body)
  })

  test('should update a task', async ({ assert }) => {
    const res = await request.put(`/tasks/${createdId}`).send({
      isFavorite: true,
      color: '#000000',
    })
    assert.equal(res.status, 200)
    assert.isTrue(res.body.isFavorite)
    assert.equal(res.body.color, '#000000')
  })

  test('should delete a task', async ({ assert }) => {
    const res = await request.delete(`/tasks/${createdId}`)
    assert.equal(res.status, 204)
  })
})
// Testes de erros e casos limites

test('should not create a task without title', async ({ assert }) => {
  const res = await request.post('/tasks').send({
    description: 'Sem título',
    color: '#ffffff',
  })
  assert.equal(res.status, 400)
  assert.equal(res.body.message, 'Validation failed')
})

test('should not create a task with invalid color', async ({ assert }) => {
  const res = await request.post('/tasks').send({
    title: 'Tarefa cor inválida',
    color: '#123456',
  })
  assert.equal(res.status, 400)
  assert.equal(res.body.message, 'Validation failed')
})

test('should return 404 when updating non-existent task', async ({ assert }) => {
  const res = await request.put('/tasks/99999').send({
    title: 'Update inexistente',
  })
  assert.equal(res.status, 404)
  assert.equal(res.body.message, 'Task not found')
})

test('should return 404 when deleting non-existent task', async ({ assert }) => {
  const res = await request.delete('/tasks/99999')
  assert.equal(res.status, 404)
  assert.equal(res.body.message, 'Task not found')
})

test('should return 404 when getting non-existent task', async ({ assert }) => {
  const res = await request.get('/tasks/99999')
  assert.equal(res.status, 404)
  assert.equal(res.body.message, 'Task not found')
})