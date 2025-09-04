import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { format } from 'date-fns';

export class UpdateTypeController {
    async handle(request: Request, response: Response) {
        const id = request.params.id;
        const typeId = '68b30e2856e18c21c1298cce';
        const updatedAt = Date.now();
        if (id !== null || typeId !== null) {
            try {
                const updateTask = await prismaClient.task.update({
                    where: {
                        id: id
                    },
                    data: {
                        updatedAt: format(updatedAt, 'dd/MM/yyyy HH:mm:SS'),
                        typeNotes: {
                            connect: { id: typeId }
                        }
                    },
                    include: {
                        typeNotes: true
                    }
                });
                return response
                    .status(200)
                    .json({ msg: 'Task as updated!', updateTask });
            } catch (error) {
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
        return response
            .status(404)
            .json({ msg: 'Person or type is not found!' });
    }
}
