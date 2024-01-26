"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUserByIdController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class FindUserByIdController {
    async handle(request, response) {
        const { id } = request.body;
        if (id === null || id === undefined) {
            return response
                .status(401)
                .json({ msg: "Id can't null!Please writing id correct!" });
        }
        try {
            const FindUser = await prismaClient_1.prismaClient.user.findFirst({
                where: {
                    id: id
                }
            });
            if (FindUser === null || FindUser === undefined) {
                return response
                    .status(404)
                    .json({ message: 'User is not found!' });
            }
            else {
                return response.status(200).json(FindUser);
            }
        }
        catch {
            return response
                .status(404)
                .json({ msg: 'Unexpected error in search user!' });
        }
    }
}
exports.FindUserByIdController = FindUserByIdController;
