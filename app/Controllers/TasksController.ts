import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class TasksController {
    public async index({ response }: HttpContextContract) {
        return response.status(200).json({ data: 'data', message: 'message' });
    }
}
