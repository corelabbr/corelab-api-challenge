import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Todo from 'App/Models/Todo';
import CreateTodoValidator from 'App/Validators/CreateTodoValidator';
import UpdateTodoValidator from 'App/Validators/UpdateTodoValidator';

export default class TodosController {
  public async index({ response }: HttpContextContract) {
    try {
      return await Todo.all();
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateTodoValidator);
      const newTodo = await Todo.create(payload);
      response.status(201);
      return newTodo;
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    try {
      const payload = await request.validate(UpdateTodoValidator);
      const todo = await Todo.findOrFail(params.id);
      return await todo.merge(payload).save();
    } catch (error) {
      response.badRequest(error.messages);
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const todo = await Todo.findOrFail(params.id);
      response.status(204);
      return await todo.delete();
    } catch (error) {
      response.badRequest(error.messages);
    }
  }
}
