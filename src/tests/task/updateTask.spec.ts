import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UpdateTaskController } from '../../controllers/tasks/UpdateTaskController';

const controller = new UpdateTaskController();

describe('UpdateTask', () => {
    it('should update a task with valid input data and return a 200 status code with a success message and the updated task', async () => {
        const mockRequest = {
            body: {
                id: 'validTaskId',
                titulo: 'New Title',
                task: 'New Task'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        prismaClient.task.update = jest.fn().mockResolvedValue({});
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
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
prismaClient.task.update=jest.fn().mockRejectedValue(new Error('Invalid input'));
        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Error on updated task!'
        });
    });
});
