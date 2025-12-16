import { Test } from '@nestjs/testing'
import { TodoRepository } from '../repositories/TodoRepository'
import { TodoApp } from './TodoApp'
import { getModelToken } from '@nestjs/mongoose'
import { Todo } from '../models/TodoModel'
import { todoMock, todoMockDocument } from 'src/_testMocks/todo-mock'

describe(TodoApp.name, () => {
  let todoApp!: TodoApp
  let todoRepository!: TodoRepository

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TodoApp,
        TodoRepository,
        {
          provide: getModelToken(Todo.name),
          useClass: jest.fn()
        }
      ]
    }).compile()

    todoApp = moduleRef.get(TodoApp)
    todoRepository = moduleRef.get(TodoRepository)
  })

  describe(TodoApp.prototype.createTodo.name, () => {
    it('should return created todo', async () => {
      jest.spyOn(todoRepository, 'createTodo').mockReturnValue(Promise.resolve(todoMockDocument))

      const todo = await todoApp.createTodo(todoMock)

      expect(todo.title).toBe(todoMockDocument.title)
    })
  })

  describe(TodoApp.prototype.deleteTodo.name, () => {
    it('should return deleted todo', async () => {
      jest.spyOn(todoRepository, 'deleteTodo').mockReturnValue(Promise.resolve(todoMockDocument))

      const todo = await todoApp.deleteTodo('teste')

      expect(todo.title).toBe(todoMockDocument.title)
    })
  })

  
})
