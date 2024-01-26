import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { DeleteTaskController } from '../../controllers/tasks/DeleteTaskController';

const controller = new DeleteTaskController();

describe('DeleteTask', () => {
    it('should delete a task when valid id is provided', async () => {
        const mockRequest = {
            body: {
                id: 'validId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.task.delete = jest.fn().mockResolvedValue({});

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Task deleted successfully!',
            deleteTask: expect.any(Object)
        });
    });
    it('should return a 400 status code and error message when attempting to delete a task with an invalid id', async () => {
        const mockRequest = {
            body: {
                id: 'invalidId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.task.delete = jest.fn().mockRejectedValue(new Error());

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Error deleting the task!'
        });
    });
});
