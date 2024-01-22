import httpStatus from 'http-status'
import supertest from 'supertest'
import { createdUser } from '../factories'
import { cleanDb, generateValidToken } from '../helpers'
import app, { init } from '@/app'
import { invalidInputError, unauthorizedError } from '@/errors'
import { faker } from '@faker-js/faker'
import {
  createTaskRequestBody,
  createAndSaveTask,
} from '../factories/task-factory'

beforeAll(async () => {
  await init()
  await cleanDb()
})

const server = supertest(app)

describe('POST /tasks', () => {
  it('should respond with status 401 if no token is given', async () => {
    const taskRequestBody = createTaskRequestBody()

    const response = await server.post('/task/create').send(taskRequestBody)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    expect(response.body.message).toEqual(unauthorizedError().message)
  })

  it('should respond with status 401 if given token is not valid', async () => {
    const taskRequestBody = createTaskRequestBody()
    const token = faker.lorem.word()

    const response = await server
      .post('/task/create')
      .send(taskRequestBody)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    expect(response.body.message).toEqual(unauthorizedError().message)
  })

  it('should respond with status 400 if trying to create a task without required fields', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)

    const taskRequestBody = {}

    const response = await server
      .post('/task/create')
      .send(taskRequestBody)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
    expect(response.body.message).toEqual(
      invalidInputError('All required fields must be filled.').message,
    )
  })

  it('should create a task with valid token', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)
    const taskRequestBody = createTaskRequestBody()
    const expectedTask = {
      id: expect.any(Number),
      title: taskRequestBody.title,
      description: taskRequestBody.description,
      favorite: taskRequestBody.favorite,
      color: taskRequestBody.color,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      userId: expect.any(Number),
    }
    const response = await server
      .post('/task/create')
      .send(taskRequestBody)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.CREATED)
    expect(response.body).toEqual(expectedTask)
  })

  it('should respond with status 400 if trying to create a task with an invalid color', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)
    const taskRequestBody = createTaskRequestBody()
    taskRequestBody.color = 'invalid_color'

    const response = await server
      .post('/task/create')
      .send(taskRequestBody)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
    expect(response.body.message).toEqual(
      invalidInputError(
        'Invalid color format. Please provide a valid hexadecimal color code.',
      ).message,
    )
  })

  it('should respond with status 400 if trying to create a task without a title', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)
    const taskRequestBody = createTaskRequestBody()
    taskRequestBody.title = ' '

    const response = await server
      .post('/task/create')
      .send(taskRequestBody)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
    expect(response.body.message).toEqual(
      invalidInputError('All required fields must be filled.').message,
    )
  })

  it('should respond with status 400 if trying to create a task without a title', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)
    const taskRequestBody = createTaskRequestBody()
    taskRequestBody.description = ' '

    const response = await server
      .post('/task/create')
      .send(taskRequestBody)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.BAD_REQUEST)
    expect(response.body.message).toEqual(
      invalidInputError('All required fields must be filled.').message,
    )
  })
})

describe('GET /tasks', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/task')

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    expect(response.body.message).toEqual(unauthorizedError().message)
  })

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word()

    const response = await server
      .get('/task')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.UNAUTHORIZED)
    expect(response.body.message).toEqual(unauthorizedError().message)
  })

  it('should retrieve tasks with valid token', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)

    const task1 = await createAndSaveTask(user.id)
    const task2 = await createAndSaveTask(user.id)

    const response = await server
      .get('/task')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.OK)

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: task1.id,
          title: task1.title,
          description: task1.description,
          favorite: task1.favorite,
          color: task1.color,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          userId: user.id,
        },
        {
          id: task2.id,
          title: task2.title,
          description: task2.description,
          favorite: task2.favorite,
          color: task2.color,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          userId: user.id,
        },
      ]),
    )
  })
})

it('should respond with status 404 if no tasks are found for the user', async () => {
  const user = await createdUser()
  const token = await generateValidToken(user)

  const response = await server
    .get('/task')
    .set('Authorization', `Bearer ${token}`)

  expect(response.status).toBe(httpStatus.NOT_FOUND)
  expect(response.body.message).toEqual('No tasks found for the user')
})

describe('DELETE /tasks/taskId', () => {
  it('should delete a task with valid token', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)

    const newTask = await createAndSaveTask(user.id)

    const response = await server
      .delete(`/task/${newTask.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.NO_CONTENT)
  })
})

describe('PUT /tasks/taskId', () => {
  it('should update a task with valid token', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)

    const newTask = await createAndSaveTask(user.id)
    const updateData = { title: 'Updated Title' }

    const response = await server
      .put(`/task/${newTask.id}`)
      .send(updateData)
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(httpStatus.OK)
  })

  it('should return 404 if task is not found for the user', async () => {
    const user = await createdUser()
    const token = await generateValidToken(user)

    // Criar uma tarefa para um usuário diferente
    const task = await createAndSaveTask(user.id + 1)

    const response = await server
      .put(`/task/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title',
      })

    expect(response.status).toBe(httpStatus.NOT_FOUND)
    expect(response.body.message).toEqual('Task not found for the user')
  })
})
