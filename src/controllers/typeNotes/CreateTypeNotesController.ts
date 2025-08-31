import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface createTypeNotesBody {
    name: string;
}
export class CreateTypeNotesController {
    async handle(request: Request, response: Response) {
        const { name }: createTypeNotesBody = request.body;
        if (name.length !== 0) {
            try {
                const createTypeNotes = await prismaClient.typeNote.create({
                    data: {
                        name: name
                    }
                });
                return response.status(200).json({
                    msg: 'New type note as created!',
                    createTypeNotes
                });
            } catch (error) {
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
        return response.status(404).json({ msg: 'Name as not empty!' });
    }
}
