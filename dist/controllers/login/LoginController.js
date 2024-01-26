"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class LoginController {
    async handle(request, response) {
        const { email, password } = request.body;
        if (email === null || email === undefined) {
            return response.status(400).json({ msg: 'Email is not found!' });
        }
        else if (password === null || password === undefined) {
            return response.status(401).json({ msg: 'Password not found!' });
        }
        try {
            const login = await prismaClient_1.prismaClient.user.findFirst({
                where: {
                    email: email,
                    AND: {
                        password: password
                    }
                },
                include: {
                    userImages: true
                }, take: 1
            });
            if (login === null || login === undefined) {
                return response
                    .status(401)
                    .json({ msg: 'Email or Password incorrect!' });
            }
            else {
                return response.status(200).json({
                    msg: 'Login sucessfully!',
                    login
                });
            }
        }
        catch {
            return response
                .status(401)
                .json({ msg: 'Unexpected error!Please try again!' });
        }
    }
}
exports.LoginController = LoginController;
