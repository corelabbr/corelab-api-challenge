import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { FindAllTasksByUserIdController } from '../../controllers/tasks/FindAllTasksByUserIdController';

const controller = new FindAllTasksByUserIdController();

describe('DeleteTask', () => {
    it('should find all tasks for a given user ID when valid user ID is provided', async () => {
        const mockRequest = {
            body: {
                userId: 'validUserId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.task.findMany= jest.fn().mockResolvedValue([]);

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
    });

    it('should handle requests with invalid user ID in the request body', async () => {
        const mockRequest = {
            body: {
                userId: 'invalidUserId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.task.findMany = jest
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
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.task.findMany = jest.fn().mockRejectedValue({});

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Internal server error!'
        });
    });
});
