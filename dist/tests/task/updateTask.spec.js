"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prismaClient_1 = require("../../database/prismaClient");
const UpdateTaskController_1 = require("../../controllers/tasks/UpdateTaskController");
const controller = new UpdateTaskController_1.UpdateTaskController();
describe('UpdateTask', () => {
    it('should update a task with valid input data and return a 200 status code with a success message and the updated task', async () => {
        const mockRequest = {
            body: {
                id: 'validTaskId',
                titulo: 'New Title',
                task: 'New Task'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.update = jest.fn().mockResolvedValue({});
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Task as updated!',
            updateTask: expect.any(Object)
        });
    });
    it('should handle and return a 400 status code with an error message for invalid input data', async () => {
        const mockRequest = {
            body: {
                id: 'validTaskId',
                titulo: '',
                task: ''
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        prismaClient_1.prismaClient.task.update = jest.fn().mockRejectedValue(new Error('Invalid input'));
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Error on updated task!'
        });
    });
});
