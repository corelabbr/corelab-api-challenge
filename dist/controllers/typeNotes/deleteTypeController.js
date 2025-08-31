"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTypeController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class deleteTypeController {
    async handle(request, response) {
        const { id } = request.body;
        if (id !== null && id.length !== 0) {
            try {
                const deleteType = await prismaClient_1.prismaClient.typeNote.delete({
                    where: {
                        id: id
                    }
                });
                return response
                    .status(200)
                    .json({ msg: 'Type note as deleted', deleteType });
            }
            catch (error) {
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
    }
}
exports.deleteTypeController = deleteTypeController;
