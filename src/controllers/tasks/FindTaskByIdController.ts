import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface findTaskBody {
    id: string;
}
export class FindTaskByIdController {
    async handle(request: Request, response: Response) {
        const { id }: findTaskBody = request.body;

        try {
            const findTask = await prismaClient.task.findFirst({
                where: {
                    id: id
                }
            });
            if (findTask === null || findTask === undefined) {
                return response.status(404).json({ msg: 'Task not found!' });
            } else {
                return response.status(200).json(findTask);
            }
        } catch {
            return response.status(400).json({
                msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
            });
        }
    }
}
