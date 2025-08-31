"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../database/prismaClient");
const DeleteUserByIdController_1 = require("../../controllers/users/DeleteUserByIdController");
const controller = new DeleteUserByIdController_1.DeleteUserByIdController();
describe('DeleteUserByIdController', () => {
    it('should delete a user when given a valid id', async () => {
        prismaClient_1.prismaClient.user.delete = jest.fn().mockResolvedValueOnce({});
        const mockRequest = {
            body: {
                id: 'validId'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.user.delete).toHaveBeenCalledWith({
            where: {
                id: 'validId'
            }
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'User was deleted!'
        });
        expect(prismaClient_1.prismaClient.user.delete).toHaveBeenCalledWith({
            where: {
                id: 'validId'
            }
        });
    });
    it('should return 401 status code when id is null', async () => {
        const mockRequest = {
            body: {
                id: null
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: "Id can't null!Please writing id correct!"
        });
    });
});
