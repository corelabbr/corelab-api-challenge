import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class FindFavoritesTasksController {
    async handle(request: Request, response: Response) {
        const id: string = request.params.id;

        try {
            const findTaskByUserId = await prismaClient.task.findMany({
                where: {  
                    userId: id,
                    AND:{
                        typeId: '68b30e2856e18c21c1298cce',
                    }
                },
                include: {
                    typeNotes: true
                }
            });
            return response.status(200).json(findTaskByUserId);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
