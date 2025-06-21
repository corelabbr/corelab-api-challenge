import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { IErrorResponse } from 'App/Types/Task'
import { createTaskSchema, updateTaskSchema } from 'App/Validators/TaskValidator'

import Task from 'App/Models/Task'

export default class TasksController {
  public async index({ response }: HttpContextContract) {
    const tasks = await Task.all()
    return response.ok(tasks)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: createTaskSchema })
      const task = await Task.create(payload)
      return response.created(task)
    } catch (error) {
      const err: IErrorResponse = {
        message: 'Validation failed',
        details: error.messages || error.message,
      }
      return response.badRequest(err)
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const task = await Task.find(Number(params.id))
    if (!task) {
      const error: IErrorResponse = { message: 'Task not found' }
      return response.notFound(error)
    }
    return response.ok(task)
  }

  public async update({ params, request, response }: HttpContextContract) {
    const id = Number(params.id)
    const existing = await Task.find(id)
    if (!existing) {
      const error: IErrorResponse = { message: 'Task not found' }
      return response.notFound(error)
    }

    try {
      const payload = await request.validate({ schema: updateTaskSchema })
      const updatedTask = await Task.update(id, payload)
      return response.ok(updatedTask)
    } catch (error) {
      const err: IErrorResponse = {
        message: 'Validation failed',
        details: error.messages || error.message,
      }
      return response.badRequest(err)
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const id = Number(params.id)
    const existing = await Task.find(id)
    if (!existing) {
      const error: IErrorResponse = { message: 'Task not found' }
      return response.notFound(error)
    }
    await Task.delete(id)
    return response.noContent()
  }
}
