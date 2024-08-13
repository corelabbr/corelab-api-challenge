import request from 'supertest'
import app from '../app'
import TodoUpsertType from '../api/types/TodoUpsert'
import errors from '../api/errors'
import { prismaMock } from '../../singleton'
import { Todos } from '@prisma/client'

const mockedTodo: Todos = {
  id: '1',
  title: 'todo 1',
  description: 'description 1',
  favorite: true,
  createdAt: new Date(),
  color: 'COLOR_OPTION_3',
  deleted: false,
}

describe('Testing route /todos', () => {
  test('It should respond to the GET method with status OK', async () => {
    const mockedTodos: Todos[] = [mockedTodo]

    prismaMock.todos.findMany.mockResolvedValue(mockedTodos)

    const response = await request(app.app)
      .get('/todos')
      .set('Content-Type', 'application/json')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: '1',
          title: 'todo 1',
          description: 'description 1',
          favorite: true,
          createdAt: expect.any(String),
          color: 'COLOR_OPTION_3',
          deleted: false,
        },
      ])
    )
  })

  test('It should create a new todo in the DB successfully', async () => {
    const todo: TodoUpsertType = {
      title: mockedTodo.title,
      description: mockedTodo.description,
    }

    prismaMock.todos.upsert.mockResolvedValue(mockedTodo)

    const response = await request(app.app)
      .post('/todos')
      .send(todo)
      .expect(201)

    expect(response.body.title).toBe(todo.title)
    expect(response.body.description).toBe(todo.description)
  })

  describe('Testing exceptions', () => {
    test('It should throw a bad request if title is missing', async () => {
      const todo = { color: 'MAGENTA', description: 'todo 8' }

      const response = await request(app.app)
        .post('/todos')
        .send(todo)
        .expect(400)

      console.log(response.body)
      expect(response.body).toEqual(errors.invalidValue.todo.title)
    })

    test('It should throw a bad request if description is missing', async () => {
      const todo = { title: 'todo 8', color: 'MAGENTA' }

      const response = await request(app.app)
        .post('/todos')
        .send(todo)
        .expect(400)

      expect(response.body).toEqual(errors.invalidValue.todo.description)
    })
  })
})

describe('Testing route /todos/:id', () => {
  test('It should update a todo successfully in DB', async () => {
    const updatedMockTodo: Todos = {
      ...mockedTodo,
      color: 'COLOR_OPTION_3',
    }

    prismaMock.todos.findUnique.mockResolvedValue(mockedTodo)
    prismaMock.todos.upsert.mockResolvedValue(updatedMockTodo)

    const response = await request(app.app)
      .put('/todos/1')
      .send(updatedMockTodo)
      .expect(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: mockedTodo.id,
        title: mockedTodo.title,
        description: mockedTodo.description,
        color: updatedMockTodo.color,
        deleted: false,
        favorite: true,
      })
    )
  })

  test('It should delete a todo successfully in DB', async () => {
    prismaMock.todos.findUnique.mockResolvedValue(mockedTodo)
    const response = await request(app.app).delete('/todos/1')
    expect(response.statusCode).toBe(200)
  })

  describe('Test exceptions', () => {
    test('It should throw a NotFoundException on put todo', async () => {
      prismaMock.todos.findUnique.mockResolvedValue(null)
      const response = await request(app.app).put('/todos/1').send(mockedTodo)
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe(errors.notFound.todo)
    })

    test('It should throw a NotFoundException on delete todo', async () => {
      prismaMock.todos.findUnique.mockResolvedValue(null)
      const response = await request(app.app).delete('/todos/1')
      expect(response.statusCode).toBe(404)
      expect(response.body).toBe(errors.notFound.todo)
    })
  })
})
