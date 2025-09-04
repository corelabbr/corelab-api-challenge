"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../database/prismaClient");
const FindAllTasksByUserIdController_1 = require("../../controllers/tasks/FindAllTasksByUserIdController");
const controller = new FindAllTasksByUserIdController_1.FindAllTasksByUserIdController();
describe('DeleteTask', () => {
    it('should find all tasks for a given user ID when valid user ID is provided', async () => {
        const mockRequest = {
            body: {
                userId: 'validUserId'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findMany = jest.fn().mockResolvedValue([]);
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
    });
    it('should handle requests with invalid user ID in the request body', async () => {
        const mockRequest = {
            body: {
                userId: 'invalidUserId'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findMany = jest
            .fn()
            .mockRejectedValue({});
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Internal server error!'
        });
    });
    it('should handle requests with invalid JSON format in the request body', async () => {
        const mockRequest = {
            body: {
                userId: 'test-on-jest'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findMany = jest.fn().mockRejectedValue({});
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Internal server error!'
        });
    });
});
