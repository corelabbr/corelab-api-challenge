"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTaskController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class DeleteTaskController {
    async handle(request, response) {
        const { id } = request.body;
        try {
            const deleteTask = await prismaClient_1.prismaClient.task.delete({
                where: {
                    id: id
                }
            });
            return response
                .status(200)
                .json({ msg: 'Task deleted successfully!', deleteTask });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.DeleteTaskController = DeleteTaskController;
