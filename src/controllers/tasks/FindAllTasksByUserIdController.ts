import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface findTaskByUserIdBody {
    userId: string;
}
export class FindAllTasksByUserIdController {
    async handle(request: Request, response: Response) {
        const { userId }: findTaskByUserIdBody = request.body;
        if (userId !== null && userId.length !== 0) {
            try {
                const findTaskByUserId = await prismaClient.task.findMany({
                    where: {
                        userId: userId,
                        AND: {
                            typeNotes: null
                        }
                    },
                    include: {
                        users: true,
                        typeNotes: true
                    }
                });
                return response.status(200).json(findTaskByUserId);
            } catch (error) {
              console.log(error)
                return response.status(500).json({ msg: 'Internal server error!'});
            }
        }
        return response.status(404).json({ msg: 'Person is not found!' });
    }
}
