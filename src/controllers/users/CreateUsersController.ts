import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { format } from 'date-fns';

interface usersBody {
    userName: string;
    email: string;
    password: string;
    image?: string;
}
export class CreateUsersController {
    async handle(request: Request, response: Response) {
        const imgBuffer: any = request.file?.buffer.toString('base64');
        const createdAt: number = Date.now();
        const { userName, email, password }: usersBody = request.body;
        if (userName === (null || undefined) || email === (null || undefined) || password === (null || undefined)) {
            return response.status(404).json({ msg:'Fields cannot empty or nulls!'});
        }
        try {
            const users = await prismaClient.user.create({
                data: {
                    userName: userName,
                    email,
                    password,
                    createdAt: format(createdAt, 'dd/MM/yyyy HH:mm:ss'),
                    userImages: {
                        create: {
                            image: imgBuffer
                        }
                    }
                },
                include: {
                    userImages: true
                }
            });
            return response
                .status(201)
                .json({ msg: 'User as created!', users });
        } catch {
            return response.status(500).json({
                msg: 'Error to create user!Please waiting for minutes and try again!'
            });
        }
    }
}
