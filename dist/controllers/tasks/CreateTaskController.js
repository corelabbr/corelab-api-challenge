"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const date_fns_1 = require("date-fns");
class CreateTaskController {
    async handle(request, response) {
        const createdAt = Date.now();
        const { titulo, task, userId } = request.body;
        if (titulo === '' ||
            titulo === undefined ||
            task === '' ||
            task === undefined) {
            return response
                .status(401)
                .json({ msg: 'Fields cannot be null or empty!' });
        }
        try {
            const newTask = await prismaClient_1.prismaClient.task.create({
                data: {
                    titulo: titulo,
                    task: task,
                    createdAt: (0, date_fns_1.format)(createdAt, 'dd/MM/yyyy HH:mm:SS'),
                    users: {
                        connect: {
                            id: userId
                        }
                    }
                }
            });
            return response
                .status(201)
                .json({ msg: 'Task as created!', newTask });
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ msg: 'Internal server error!' });
        }
    }
}
exports.CreateTaskController = CreateTaskController;
