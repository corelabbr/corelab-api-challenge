import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface PatchUserBody {
    id: string;
    userName: string;
    email: string;
    password: string;   
    imgId: string;
}
export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const imgBuffer: any = request.file?.buffer.toString('base64');
        const { id, userName, email, password, imgId }: PatchUserBody =
            request.body;
        try {
            const patchUser = await prismaClient.user.update({
                where: {
                    id: id
                },
                data: {
                    userName: userName,
                    email: email,
                    password: password,
                    userImages: {
                        update: {
                            where: {
                                id: imgId
                            },
                            data: {
                                image: imgBuffer
                            }
                        }
                    }
                }
            });
            return response.status(200).json(patchUser);
        } catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
