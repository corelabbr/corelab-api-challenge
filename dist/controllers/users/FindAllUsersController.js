"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsersController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindAllUsersController {
    async handle(request, response) {
        try {
            const findUsers = await prismaClient_1.prismaClient.user.findMany({});
            if (findUsers === null || findUsers === undefined) {
                return response
                    .status(400)
                    .json({ msg: 'User is not registered' });
            }
            return response.status(200).json(findUsers);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.FindAllUsersController = FindAllUsersController;
