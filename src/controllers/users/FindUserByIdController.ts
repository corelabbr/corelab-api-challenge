import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface FindUserBody {
    id: string;
}
export class FindUserByIdController {
    async handle(request: Request, response: Response) {
        const { id }: FindUserBody = request.body;
        if (id === null || id === undefined) {
            return response
                .status(401)
                .json({ msg: "Id can't null!Please writing id correct!" });
        }
        try {
            const FindUser = await prismaClient.user.findFirst({
                where: {
                    id: id
                },
                include: {
                    userImages: true
                }
            });
            if (FindUser === null || FindUser === undefined) {
                return response
                    .status(404)
                    .json({ message: 'User is not found!' });
            } else {
                return response.status(200).json(FindUser);
            }
        } catch {
            return response
                .status(404)
                .json({ msg: 'Unexpected error in search user!' });
        }
    }
}
