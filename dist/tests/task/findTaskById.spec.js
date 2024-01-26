"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../database/prismaClient");
const FindTaskByIdController_1 = require("../../controllers/tasks/FindTaskByIdController");
const controller = new FindTaskByIdController_1.FindTaskByIdController();
describe('FindTaskById', () => {
    it('should find a task by ID and return it as JSON response with status code 200', async () => {
        const mockRequest = {
            body: {
                id: 'validTaskId'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findFirst = jest.fn().mockResolvedValue({
            id: 'validTaskId',
            name: 'Task 1'
        });
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            id: 'validTaskId',
            name: 'Task 1'
        });
    });
    it('should return an error message with status code 400 if an unexpected error occurs during the search for tasks', async () => {
        const mockRequest = {
            body: {
                id: 'validTaskId'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findFirst = jest
            .fn()
            .mockRejectedValue(new Error('Unexpected error'));
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
        });
    });
    it('should search for a task with an invalid or non-existent ID and return an error message with status code 404', async () => {
        const mockRequest = {
            body: {
                id: 'invalidTaskId'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findFirst = jest.fn().mockResolvedValue(null);
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Task not found!'
        });
    });
    it('should search for a task with a valid but non-string ID and return an error message with status code 404', async () => {
        const mockRequest = {
            body: {
                id: 123
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Task not found!'
        });
    });
    it('should search for a task with a valid but non-string ID and return an error message with status code 400', async () => {
        const mockRequest = {
            body: {
                id: ''
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.findFirst = jest
            .fn()
            .mockRejectedValue(new Error('Unexpected error'));
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error when searching for tasks!Please reload page and try again!'
        });
    });
});
