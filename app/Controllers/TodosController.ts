import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Todo from "App/Models/Todo";
import { Todo as TodoType } from "App/Types/Todo";

export default class TodosController {
    public async index({ response }: HttpContextContract) {
        try {
            const todos = await Todo.all()
            if (todos.length === 0) {
                return response.ok({
                    ok: true,
                    message: "Create your first to do",
                    data: []
                })
            }
            return response.ok({
                ok: true,
                message: "To dos retrieved successfully",
                data: todos as TodoType[]
            })
        } catch (error) {
            return response.internalServerError({
                ok: false,
                message: "Failed to retrieve to dos",
            })
        }
    }

    public async store({ request, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                title: schema.string(),
                description: schema.string(),
                is_favorite: schema.boolean(),
                color: schema.string(),
            }),
        })
        try {
            const todo = await Todo.create(payload)
            if (!todo) {
                return response.badRequest({
                    ok: false,
                    message: "Failed to create to do",
                })
            }
            return response.created({
                ok: true,
                message: "To do created successfully",
                data: todo as TodoType
            })
        } catch (error) {
            return response.internalServerError({
                ok: false,
                message: "Failed to create to do",
            })
        }
    }

    public async update({ request, response }: HttpContextContract) {
        const payload = await request.validate({
            schema: schema.create({
                title: schema.string.optional(),
                description: schema.string.optional(),
                is_favorite: schema.boolean.optional(),
                color: schema.string.optional(),
            }),
        })
        try {
            const { id } = request.params()
            const todo = await Todo.find(id)
            if (!todo) {
                return response.notFound({
                    ok: false,
                    message: "To do not found",
                })
            }
            todo.merge(payload)
            await todo.save()
            return response.ok({
                ok: true,
                message: "To do updated successfully",
                data: todo as TodoType
            })
        } catch (error) {
            return response.internalServerError({
                ok: false,
                message: "Failed to update to do",
            })
        }
    }

    public async delete({ request, response }: HttpContextContract) {
        const { id } = request.params()
        try {
            const todo = await Todo.find(id)
            if (!todo) {
                return response.notFound({
                    ok: false,
                    message: "To do not found",
                })
            }
            await todo.delete()
            return response.ok({
                ok: true,
                message: "To do deleted successfully",
            })
        } catch (error) {
            return response.internalServerError({
                ok: false,
                message: "Failed to delete to do",
            })
        }
    }
}
