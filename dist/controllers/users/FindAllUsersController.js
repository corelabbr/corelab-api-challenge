"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllUsersController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindAllUsersController {
    async handle(request, response) {
        try {
            const findUsers = await prismaClient_1.prismaClient.user.findMany({});
            return response.status(200).json(findUsers);
        }
        catch {
            return response
                .status(400)
                .json({
                msg: 'Unexpected error in search users!Please reload page and try again!'
            });
        }
    }
}
exports.FindAllUsersController = FindAllUsersController;
