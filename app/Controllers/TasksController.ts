import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const Task = require('App/Models/Task')

export default class TasksController {
    public async index({ response }: HttpContextContract) {
        const tasks = await Task.all();

        if (tasks.length == 0) {
            return response.status(400).json({ message: "Nenhuma tarefa foi encontada." });
        }
        return response.status(200).json({ message: "Tarefas encontadas!", data: tasks });
    }

    public async show({ response, params }: HttpContextContract) {
        const taskId = params.id;
        const task = await Task.find(taskId);

        if (task.length == 0) {
            return response.status(400).json({ message: "Nenhuma tarefa foi encontada." });
        }
        return response.status(200).json({ message: "Tarefa encontada!", data: task });
    }

    public async store({ request, response }: HttpContextContract) {
        const data = request.all();
        const task = await Task.create(data);

        if (typeof (task) != 'string') {
            return response.status(400).json({ message: "A tarefa não pôde ser criada." });
        }
        return response.status(200).json({ message: "Tarefa criada com sucesso!", tarefa: task });
    }

    public async update({ request, response, params }: HttpContextContract) {
        const data = request.all();
        const taskId = params.id;

        const task = await Task.update(taskId, data);
        if (typeof (task) != 'string') {
            return response.status(400).json({ message: "A tarefa não pôde ser atualizada." });
        }
        return response.status(200).json({ message: "Tarefa atualizada com sucesso!", id: parseInt(task) });
    }

    public async destroy({ response, params }: HttpContextContract) {
        const taskId = params.id;
        const task = await Task.delete(taskId);

        if (typeof (task) != 'string') {
            return response.status(400).json({ message: "A tarefa não pôde ser excluída." });
        }
        return response.status(200).json({ message: "Tarefa excluída com sucesso!", id: parseInt(task) });
    }
}
