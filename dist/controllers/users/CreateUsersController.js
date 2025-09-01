"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const date_fns_1 = require("date-fns");
class CreateUsersController {
    async handle(request, response) {
        const imgBuffer = request.file.buffer.toString('base64');
        const createdAt = Date.now();
        const { userName, email, password } = request.body;
        if (userName === null ||
            userName === undefined ||
            email === null ||
            email === undefined ||
            password === null ||
            password === undefined) {
            return response
                .status(404)
                .json({ msg: 'Fields cannot empty or nulls!' });
        }
        try {
            const users = await prismaClient_1.prismaClient.user.create({
                data: {
                    userName: userName,
                    email: email,
                    password: password,
                    createdAt: (0, date_fns_1.format)(createdAt, 'dd/MM/yyyy HH:mm:ss'),
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
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.CreateUsersController = CreateUsersController;
