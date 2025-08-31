"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllTasksByUserIdController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindAllTasksByUserIdController {
    async handle(request, response) {
        const { userId } = request.body;
        try {
            const findTaskByUserId = await prismaClient_1.prismaClient.user.findFirst({
                where: {
                    id: userId
                },
                include: {
                    tasks: true
                }
            });
            return response.status(200).json(findTaskByUserId);
        }
        catch {
            return response
                .status(400)
                .json({
                msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
            });
        }
    }
}
exports.FindAllTasksByUserIdController = FindAllTasksByUserIdController;
