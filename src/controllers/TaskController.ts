const User = require('../models/User')
import { Request, Response } from 'express';


const GetUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const user = await User.findAll();
        return res.status(200).send({
            status: 200,
            message: 'OK',
            data: user
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
const CreateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { title, color, description, isFavorite } = req.body;
        const create = await User.create(
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
const UpdateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { title, description, isFavorite, color } = req.body;
        const edit = await User.findByPk(id);
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
    GetUsers,
    CreateUser,
    UpdateUser,
};