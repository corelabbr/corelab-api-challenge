"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const date_fns_1 = require("date-fns");
class UpdateTaskController {
    async handle(request, response) {
        const { id, titulo, task, userId } = request.body;
        const updatedAt = Date.now();
        if (id !== null || userId !== null) {
            try {
                const updateTask = await prismaClient_1.prismaClient.task.update({
                    where: {
                        id: id,
                        AND: {
                            userId: userId
                        }
                    },
                    data: {
                        titulo: titulo,
                        task: task,
                        updatedAt: (0, date_fns_1.format)(updatedAt, 'dd/MM/yyyy HH:mm:SS')
                    }
                });
                return response
                    .status(200)
                    .json({ msg: 'Task as updated!', updateTask });
            }
            catch (error) {
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
        return response.status(500).json({ msg: 'Erro on server!' });
    }
}
exports.UpdateTaskController = UpdateTaskController;
