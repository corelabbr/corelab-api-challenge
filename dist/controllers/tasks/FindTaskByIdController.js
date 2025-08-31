"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindTaskByIdController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindTaskByIdController {
    async handle(request, response) {
        const { id } = request.body;
        try {
            const findTask = await prismaClient_1.prismaClient.task.findFirst({
                where: {
                    id: id
                }
            });
            if (findTask === null || findTask === undefined) {
                return response.status(404).json({ msg: 'Task not found!' });
            }
            else {
                return response.status(200).json(findTask);
            }
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.FindTaskByIdController = FindTaskByIdController;
