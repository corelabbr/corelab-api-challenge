"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUserByIdController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class DeleteUserByIdController {
    async handle(request, response) {
        const { id } = request.body;
        if (id === null || id === undefined) {
            return response
                .status(401)
                .json({ msg: "Id can't null!Please writing id correct!" });
        }
        try {
            const DeleteById = await prismaClient_1.prismaClient.user.delete({
                where: {
                    id: id
                }
            });
            return response.status(200).json({ msg: 'User was deleted!' });
        }
        catch {
            return response.status(400).json({ error: 'Error on delete user' });
        }
    }
}
exports.DeleteUserByIdController = DeleteUserByIdController;
