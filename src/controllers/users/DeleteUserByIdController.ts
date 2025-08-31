import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface DeleteByIdBody {
    id: string;
}
export class DeleteUserByIdController {
    async handle(request: Request, response: Response) {
        const { id }: DeleteByIdBody = request.body;
        if (id === null || id === undefined) {
            return response
                .status(401)
                .json({ msg: "Id can't null!Please writing id correct!" });
        }
        try {
            const DeleteById = await prismaClient.user.delete({
                where: {
                    id: id
                }
            });
            return response.status(200).json({ msg: 'User was deleted!' });
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
