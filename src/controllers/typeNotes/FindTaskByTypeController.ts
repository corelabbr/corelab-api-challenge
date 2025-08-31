import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface findTaskByUserIdBody {
    userId: string;
    typeId: string;
}
export class FindFavoritesTasksController {
    async handle(request: Request, response: Response) {
        const { userId, typeId }: findTaskByUserIdBody = request.body;

        try {
            const findTaskByUserId = await prismaClient.typeNote.findMany({
                where: {
                    id: typeId
                },
                include: {
                    tasks: true
                }
            });
            return response.status(200).json(findTaskByUserId);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
