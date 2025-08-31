import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface DeleteBody {
    id: string;
}
export class deleteTypeController {
    async handle(request: Request, response: Response) {
        const { id }: DeleteBody = request.body;
        if (id !== null && id.length !== 0) {
            try {
                const deleteType = await prismaClient.typeNote.delete({
                    where: {
                        id: id
                    }
                });
                return response
                    .status(200)
                    .json({ msg: 'Type note as deleted', deleteType });
            } catch (error) {
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
    }
}
