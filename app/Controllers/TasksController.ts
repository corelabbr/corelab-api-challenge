import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const Task = require('App/Models/Task')

export default class TasksController {
    public async index({ response }: HttpContextContract) {
        const tasks = await Task.all()
        if (tasks.length == 0) {
            return response.status(200).json({ message: "Nenhuma task encontada." });
        }
        return response.status(200).json({ message: "Tasks encontadas!", data: tasks });
    }
}
