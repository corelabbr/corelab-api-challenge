import type { HttpContext } from '@adonisjs/core/http'
import Task from '../models/task.js'
import { createTaskValidator, updaetTaskValidator } from '../validators/task.js'

export default class TasksController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await Task.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createTaskValidator)
    return await Task.create(payload)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await Task.find(params.id)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await request.validateUsing(updaetTaskValidator)
    const task = await Task.find(params.id)
    task?.merge(payload)
    await task?.save()
    return task
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const task = await Task.find(params.id)
    await task?.delete()
    return task
  }
}