"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindAllTasksByUserIdController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindAllTasksByUserIdController {
    async handle(request, response) {
        const { userId } = request.body;
        if (userId !== null && userId.length !== 0) {
            try {
                const findTaskByUserId = await prismaClient_1.prismaClient.task.findMany({
                    where: {
                        userId: userId,
                        AND: {
                            typeNotes: null
                        }
                    },
                    include: {
                        users: true,
                        typeNotes: true
                    }
                });
                return response.status(200).json(findTaskByUserId);
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ msg: 'Internal server error!' });
            }
        }
        return response.status(404).json({ msg: 'Person is not found!' });
    }
}
exports.FindAllTasksByUserIdController = FindAllTasksByUserIdController;
