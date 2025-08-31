"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindFavoritesTasksController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindFavoritesTasksController {
    async handle(request, response) {
        const { userId, typeId } = request.body;
        try {
            const findTaskByUserId = await prismaClient_1.prismaClient.typeNote.findMany({
                where: {
                    id: typeId
                },
                include: {
                    tasks: true
                }
            });
            return response.status(200).json(findTaskByUserId);
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.FindFavoritesTasksController = FindFavoritesTasksController;
