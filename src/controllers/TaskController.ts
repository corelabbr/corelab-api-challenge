const Task = require('../models/Task')
import { Request, Response } from 'express';


const GetTasks = async (req: Request, res: Response): Promise<Response> => {
    try {
        const task = await Task.findAll();
        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: task
        });
    } catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            })
        }
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            erros: error
        })
    }

}
const CreateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, color, description, isFavorite } = req.body;
        const create = await Task.create(
            {
                title,
                description,
                isFavorite,
                color,

            });
        return res.status(201).send({
            status: 201,
            message: 'Created',
            data: create
        })
    }
    catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            })
        }
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            erros: error
        })
    }
}
const UpdateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { title, description, isFavorite, color } = req.body;
        const edit = await Task.findByPk(id);
        if (!edit) {
            return res.status(404).send({
                status: 404,
                message: 'Data Not Found',
                data: null
            });
        }

        edit.set({
            title,
            description,
            isFavorite,
            color
        })
        await edit.save();
        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: edit
        });
    }
    catch (error: any) {
        if (error != null && error instanceof Error) {
            return res.status(500).send({
                status: 500,
                message: error.message,
                errors: error
            })
        }
        return res.status(500).send({
            status: 500,
            message: "Internal server error",
            erros: error
        })
    }
}

export default {
    GetTasks,
    CreateTask,
    UpdateTask,
};