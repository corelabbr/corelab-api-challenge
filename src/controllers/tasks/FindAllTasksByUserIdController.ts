import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class FindAllTasksByUserIdController {
    async handle(request: Request, response: Response) {
        const id:string = request.params.id ;
        if (id !== null && id !== '' && id !== undefined) {
            try {
                const findTaskByUserId = await prismaClient.task.findMany({
                    where: {
                        userId: id,
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
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
        return response.status(404).json({ msg: 'Person is not found!' });
    }
}
