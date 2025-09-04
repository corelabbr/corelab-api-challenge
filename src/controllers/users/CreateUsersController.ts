import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { format } from 'date-fns';

interface UsersBody {
    userName: string;
    email: string;
    password: string;
    image?: string;
}
export class CreateUsersController {
    async handle(request: Request, response: Response) {
        const imgBuffer: any = request.file?.buffer.toString('base64');
        const createdAt: number = Date.now();
        const { userName, email, password }: UsersBody = request.body;
        if (
            userName === null ||
            userName === undefined ||
            email === null ||
            email === undefined ||
            password === null ||
            password === undefined
        ) {
            return response
                .status(404)
                .json({ msg: 'Fields cannot empty or nulls!' });
        }
        try {
            const users = await prismaClient.user.create({
                data: {
                    userName: userName,
                    email: email,
                    password: password,
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
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
