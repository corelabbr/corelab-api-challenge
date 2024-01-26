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
        prismaClient_1.prismaClient.user.findFirst = jest.fn().mockResolvedValue({
            id: 'validUserId',
            tasks: [
                { id: 'task1', name: 'Task 1' },
                { id: 'task2', name: 'Task 2' }
            ]
        });
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            id: 'validUserId',
            tasks: [
                { id: 'task1', name: 'Task 1' },
                { id: 'task2', name: 'Task 2' }
            ]
        });
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
        prismaClient_1.prismaClient.user.findFirst = jest
            .fn()
            .mockRejectedValue(new Error('Invalid Id'));
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
        });
    });
    it('should handle requests with invalid JSON format in the request body', async () => {
        const mockRequest = {
            body: 'invalidJson'
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
        });
    });
});
