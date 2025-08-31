import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
interface patchUserBody {
    id: string;
    userName: string;
    email: string;
    password: string;
    image?: string;
    imgId: string;
}
export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const imgBuffer: any = request.file?.buffer.toString('base64');
        const { id, userName, email, password, imgId }: patchUserBody =
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
        } catch {
            return response
                .status(500)
                .json({ msg: 'unexpected error in update user!' });
        }
    }
}
