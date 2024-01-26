"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../database/prismaClient");
const FindAllUsersController_1 = require("../../controllers/users/FindAllUsersController");
const controller = new FindAllUsersController_1.FindAllUsersController();
describe('FindAllUsersController', () => {
    it('should retrieve all users from the database', async () => {
        prismaClient_1.prismaClient.user.findMany = jest.fn().mockResolvedValue([]);
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
    });
    it('should return an error message when an unexpected error occurs', async () => {
        const mockRequest = {};
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.user.findMany = jest
            .fn()
            .mockRejectedValueOnce(new Error('Unexpected error'));
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error in search users!Please reload page and try again!'
        });
    });
});
