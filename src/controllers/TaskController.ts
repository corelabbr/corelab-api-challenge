const Task = require('../models/Task')
import { Request, Response } from 'express'
type Task = {
    title: string
    description: string
    isFavorite: boolean
    color: string
}

const GetTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const task = await Task.findAll()
        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: task,
        })
    } catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            })
        }
        return res.status(500).send({
            status: 500,
            message: 'Internal server error',
            erros: error,
        })
    }
}
const CreateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, color, description, isFavorite } = req.body
        const create = await Task.create({
            title,
            description,
            isFavorite,
            color,
        })
        return res.status(201).send({
            status: 201,
            message: 'Created',
            data: create,
        })
    } catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            })
        }
        return res.status(500).send({
            status: 500,
            message: 'Internal server error',
            erros: error,
        })
    }
}

const UpdateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const { title, description, isFavorite, color } = req.body
        const edit = await Task.findByPk(id)

        if (!edit) {
            return res.status(404).send({
                status: 404,
                message: 'Data Not Found',
                data: null,
            })
        }

        const updatedFields: Partial<Task> = {
            title,
            description,
            isFavorite,
            color,
        }

        Object.assign(edit, updatedFields)

        await edit.save()

        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: edit,
        })
    } catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            })
        }

        return res.status(500).send({
            status: 500,
            message: 'Internal server error',
            errors: error,
        })
    }
}

const DeleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params
        const responseDestroy = await Task.destroy({
            where: { id },
        })
        if (responseDestroy === 1) {
            return res.status(204).end()
        }
        return res.status(404).json({ error: 'no found' })
    } catch (error) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error,
            })
        }

        return res.status(500).send({
            status: 500,
            message: 'Internal server error',
            errors: error,
        })
    }
}

export default {
    GetTasks,
    CreateTask,
    UpdateTask,
    DeleteTask,
}
