"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCompletedTaskController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const date_fns_1 = require("date-fns");
class UpdateCompletedTaskController {
    async handle(request, response) {
        const { id, titulo, task } = request.body;
        const completedAt = Date.now();
        try {
            const updateTask = await prismaClient_1.prismaClient.task.update({
                where: {
                    id: id
                },
                data: {
                    titulo: titulo,
                    task: task,
                    completedAt: (0, date_fns_1.format)(completedAt, 'dd/MM/yyyy HH:mm:SS')
                }
            });
            return response
                .status(200)
                .json({ msg: 'Task as updated!', updateTask });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.UpdateCompletedTaskController = UpdateCompletedTaskController;
