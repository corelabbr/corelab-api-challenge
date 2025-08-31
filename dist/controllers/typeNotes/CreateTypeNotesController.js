"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTypeNotesController = void 0;
const prismaClient_1 = require("../../database/prismaClient");
class CreateTypeNotesController {
    async handle(request, response) {
        const { name } = request.body;
        if (name.length !== 0) {
            try {
                const createTypeNotes = await prismaClient_1.prismaClient.typeNote.create({
                    data: {
                        name: name
                    }
                });
                return response.status(200).json({
                    msg: 'New type note as created!',
                    createTypeNotes
                });
            }
            catch (error) {
                console.log(error);
                return response
                    .status(500)
                    .json({ msg: 'Internal server error!' });
            }
        }
        return response.status(404).json({ msg: 'Name as not empty!' });
    }
}
exports.CreateTypeNotesController = CreateTypeNotesController;
