"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTypeController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
const date_fns_1 = require("date-fns");
class UpdateTypeController {
    async handle(request, response) {
        const { id, userId, typeId } = request.body;
        const updatedAt = Date.now();
        if (id !== null || userId !== null) {
            try {
                const updateTask = await prismaClient_1.prismaClient.task.update({
                    where: {
                        id: id
                    },
                    data: {
                        updatedAt: (0, date_fns_1.format)(updatedAt, 'dd/MM/yyyy HH:mm:SS'),
                        typeNotes: {
                            connect: { id: typeId }
                        }
                    },
                    include: {
                        typeNotes: true
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
        return response.status(404).json({ msg: 'Person or type is not found!' });
    }
}
exports.UpdateTypeController = UpdateTypeController;
