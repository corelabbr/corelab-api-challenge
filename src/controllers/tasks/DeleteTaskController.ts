import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class DeleteTaskController {
    async handle(request: Request, response: Response) {
        const id:string = request.params.id;
        try {
            const deleteTask = await prismaClient.task.delete({
                where: {
                    id: id
                }
            });
            return response
                .status(200)
                .json({ msg: 'Task deleted successfully!', deleteTask });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
