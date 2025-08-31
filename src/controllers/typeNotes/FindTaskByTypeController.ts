import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface findTaskByUserIdBody {
    userId: string;
    typeId: string
}
export class FindFavoritesTasksController {
    async handle(request: Request, response: Response) {
        const { userId,typeId }: findTaskByUserIdBody = request.body;
        try {
            const findTaskByUserId = await prismaClient.typeNote.findMany({
                where: {
                    id: typeId,
                    AND: {
                        tasks: {
                            userId: userId
                        }
                    }
                },
                include: {
                    tasks: true
                }
            });
            return response.status(200).json(findTaskByUserId);
        } catch {
            return response.status(400).json({
                msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
            });
        }
    }
}
