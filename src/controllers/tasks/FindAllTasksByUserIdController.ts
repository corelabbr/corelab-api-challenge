import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface findTaskByUserIdBody {
    userId: string;
}
export class FindAllTasksByUserIdController {
    async handle(request: Request, response: Response) {
        const { userId }: findTaskByUserIdBody = request.body;
        try {
            const findTaskByUserId = await prismaClient.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    tasks: true
                }
            });
            return response.status(200).json(findTaskByUserId);
        } catch {
            return response
                .status(400)
                .json({
                    msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
                });
        }
    }
}
