import { Test } from '@nestjs/testing'
import { TodoController } from './TodoController'
import { TodoApp } from 'src/business/app/TodoApp'
import { PaginationDto } from 'src/types/dto/PaginationDto'
import { Todo, TodoDocument } from 'src/business/models/TodoModel'
import { TodoRepository } from 'src/business/repositories/TodoRepository'
import { getModelToken } from '@nestjs/mongoose'
import { todoMock, todoMock2, todoMockDocument } from 'src/_testMocks/todo-mock'

describe(TodoController.name, () => {
  let todoController!: TodoController
  let todoApp!: TodoApp

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoApp,
        TodoRepository,
        {
          provide: getModelToken(Todo.name),
          useClass: jest.fn()
        }
      ]
    }).compile()

    todoController = moduleRef.get(TodoController)
    todoApp = moduleRef.get(TodoApp)
  })

  describe(TodoController.prototype.listTodos.name, () => {
    const params: PaginationDto = {
      page: 1,
      size: 20
    }
    const returnTodo = {
      data: [] as TodoDocument[],
      total: 0
    }

    it(`should pass paginations params to ${TodoApp.prototype.listTodos.name}`, async () => {
      jest.spyOn(todoApp, 'listTodos').mockImplementation(jest.fn())

      await todoController.listTodos(params)

      expect(todoApp.listTodos).toHaveBeenCalledWith(params)
    })

    it(`should return data and total`, async () => {
      jest
        .spyOn(todoApp, 'listTodos')
        .mockReturnValue(Promise.resolve(returnTodo))

      expect(await todoController.listTodos(params)).toBe(returnTodo)
    })

    it(`should return maximum ${params.size} todos`, async () => {
      jest
        .spyOn(todoApp, 'listTodos')
        .mockReturnValue(Promise.resolve(returnTodo))

      const todo = await todoController.listTodos(params)
      expect(todo.data.length).toBeLessThanOrEqual(params.size)
    })
  })

  describe(TodoController.prototype.createTodo.name, () => {
    it(`should pass dto to ${TodoApp.prototype.createTodo.name}`, async () => {
      jest.spyOn(todoApp, 'createTodo').mockImplementation(jest.fn())

      await todoController.createTodo(todoMock2)

      expect(todoApp.createTodo).toHaveBeenCalledWith(todoMock2)
    })

    it(`should return a new todo`, async () => {
      jest
        .spyOn(todoApp, 'createTodo')
        .mockReturnValue(Promise.resolve(todoMockDocument))

      expect(await todoController.createTodo(todoMock2)).toBe(todoMockDocument)
    })
  })

  describe(TodoController.prototype.deleteTodo.name, () => {
    it(`should pass dto id to ${TodoApp.prototype.deleteTodo.name}`, async () => {
      jest.spyOn(todoApp, 'deleteTodo').mockImplementation(jest.fn())

      const id = 'aa'
      await todoController.deleteTodo(id)

      expect(todoApp.deleteTodo).toHaveBeenCalledWith(id)
    })

    it(`should return deleted todo`, async () => {
      jest
        .spyOn(todoApp, 'deleteTodo')
        .mockReturnValue(Promise.resolve(todoMockDocument))

      expect(await todoController.deleteTodo('aa')).toBe(todoMockDocument)
    })
  })

  describe(TodoController.prototype.updateTodo.name, () => {
    it(`should pass dto to ${TodoApp.prototype.updateTodo.name}`, async () => {
      jest.spyOn(todoApp, 'updateTodo').mockImplementation(jest.fn())

      const data = {
        ...todoMock,
        id: 'teste'
      }
      await todoController.updateTodo(data)

      expect(todoApp.updateTodo).toHaveBeenCalledWith(data)
    })

    it(`should return updated todo`, async () => {
      jest
        .spyOn(todoApp, 'updateTodo')
        .mockReturnValue(Promise.resolve(todoMockDocument))

      const data = {
        ...todoMock,
        id: 'teste'
      }

      expect(await todoController.updateTodo(data)).toBe(todoMockDocument)
    })
  })
})
