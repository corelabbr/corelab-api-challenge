import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { format } from 'date-fns';
interface TasksBody {
    titulo: string;
    task: string;
    createdAt: string;
    userId: string;
}
export class CreateTaskController {
    async handle(request: Request, response: Response) {
        const createdAt = Date.now();
        const { titulo, task, userId }: TasksBody = request.body;
        if (
            titulo === '' ||
            titulo === undefined ||
            task === '' ||
            task === undefined
        ) {
            return response
                .status(401)
                .json({ msg: 'Fields cannot be null or empty!' });
        }
        try {
            const newTask = await prismaClient.task.create({
                data: {
                    titulo: titulo,
                    task: task,
                    createdAt: format(createdAt, 'dd/MM/yyyy HH:mm:SS'),
                    users: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return response
                .status(201)
                .json({ msg: 'Task as created!', newTask });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
