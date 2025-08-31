import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class FindAllUsersController {
    async handle(request: Request, response: Response) {
        try {
            const findUsers = await prismaClient.user.findMany({});
            if (findUsers === null || findUsers === undefined) {
                return response
                    .status(400)
                    .json({ msg: 'User is not registered' });
            }
            return response.status(200).json(findUsers);
        } catch {
            return response.status(400).json({
                msg: 'Unexpected error in search users!Please reload page and try again!'
            });
        }
    }
}
