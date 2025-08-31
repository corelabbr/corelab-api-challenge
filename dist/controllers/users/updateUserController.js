"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class updateUserController {
    async handle(request, response) {
        const imgBuffer = request.file?.buffer.toString('base64');
        const { id, userName, email, password, imgId } = request.body;
        try {
            const patchUser = await prismaClient_1.prismaClient.user.update({
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
        }
        catch {
            return response
                .status(500)
                .json({ msg: 'unexpected error in update user!' });
        }
    }
}
exports.updateUserController = updateUserController;
