import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

interface loginBody {
    email: string;
    password: string;
}

export class LoginController {
    async handle(request: Request, response: Response) {
        const { email, password }: loginBody = request.body;
        if (email === null || email === undefined) {
            return response.status(400).json({ msg: 'Email is not found!' });
        } else if (password === null || password === undefined) {
            return response.status(401).json({ msg: 'Password not found!' });
        }
        try {
            const login = await prismaClient.user.findFirst({
                where: {
                    email: email,
                    AND: {
                        password: password
                    }
                },
                include: {
                    userImages: true
                },take:1
            });
            if (login === null || login === undefined) {
                return response
                    .status(401)
                    .json({ msg: 'Email or Password incorrect!' });
            } else {
                return response.status(200).json({
                    msg: 'Login sucessfully!',
                    login
                });
            }
        } catch {
            return response
                .status(401)
                .json({ msg: 'Unexpected error!Please try again!' });
        }
    }
}
