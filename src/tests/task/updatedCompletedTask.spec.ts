import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UpdateCompletedTaskController } from '../../controllers/tasks/UpdateCompletedTaskController';

const controller = new UpdateCompletedTaskController();

describe('UpdateCompletedTask', () => {
    it('should update a task with valid input and return a 200 status code and the updated task', async () => {
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

        prismaClient.task.update = jest.fn().mockResolvedValue({
            id: 'validTaskId',
            titulo: 'New Title',
            task: 'New Task',
            completedAt: '01/01/2022 12:00:00'
        });

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Task as updated!',
            updateTask: {
                id: 'validTaskId',
                titulo: 'New Title',
                task: 'New Task',
                completedAt: '01/01/2022 12:00:00'
            }
        });
    });
    it('should return a 400 status code and an error message if the update fails', async () => {
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

        prismaClient.task.update = jest
            .fn()
            .mockRejectedValue(new Error('Update failed'));

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Error on updated task!'
        });
    });
});
