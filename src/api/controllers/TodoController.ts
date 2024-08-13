import { NextFunction, Request, Response } from 'express'
import prisma from '../../libs/prisma'
import TodoUpsertType from '../types/TodoUpsert'
import {
  colorExistsOrError,
  todoExistsOrError,
  validValueOrError,
} from '../../utils/validations'
import errors from '../errors'
import { Colors } from '@prisma/client'

class TodoController {
  async getTodos(req: Request, res: Response, next: NextFunction) {
    try {
      const todos = await prisma.todos.findMany({
        where: { deleted: false },
        select: {
          id: true,
          title: true,
          description: true,
          favorite: true,
          createdAt: true,
          color: true,
        },
        orderBy: [{ favorite: 'desc' }, { createdAt: 'desc' }],
      })
      res.status(200).json(todos)
      next()
    } catch (err) {
      next(err)
    }
  }

  async upsertTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const method = req.method
      const { todoId } = req.params
      const { description, title, favorite }: TodoUpsertType = req.body
      console.log(req.body)

      validValueOrError(title, errors.invalidValue.todo.title)
      validValueOrError(description, errors.invalidValue.todo.description)

      if (method === 'PUT') {
        await todoExistsOrError(todoId)
      }

      const upsertedTodo = await prisma.todos.upsert({
        where: { id: todoId || '' },
        create: {
          title,
          description,
          favorite: typeof favorite === 'boolean' ? favorite : false,
        },
        update: { title, description },
      })
      const statusCode = method === 'POST' ? 201 : 200
      res.status(statusCode).json(upsertedTodo)
    } catch (err) {
      console.log(err)
      next(err)
    }
  }

  async toggleFavoriteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { todoId } = req.params

      const todoExists = await todoExistsOrError(todoId)

      const updatedTodo = await prisma.todos.update({
        where: { id: todoId },
        data: { favorite: !todoExists.favorite },
      })

      return res.status(200).json(updatedTodo)
    } catch (err) {
      next(err)
    }
  }

  async changeTodoColor(req: Request, res: Response, next: NextFunction) {
    try {
      const color: Colors = req.body.color
      const { todoId } = req.params

      await todoExistsOrError(todoId)
      colorExistsOrError(color, errors.invalidValue.todo.color)

      const updatedTodo = await prisma.todos.update({
        where: { id: todoId },
        data: { color },
      })

      return res.status(200).json(updatedTodo)
    } catch (err) {
      next(err)
    }
  }

  async deleteTodo(req: Request, res: Response, next: NextFunction) {
    try {
      const { todoId } = req.params
      await todoExistsOrError(todoId)
      await prisma.todos.update({
        where: { id: todoId },
        data: { deleted: true },
      })

      res.status(200).json()
    } catch (err) {
      next(err)
    }
  }
}

export default new TodoController()
