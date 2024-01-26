import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { FindUserByIdController } from '../../controllers/users/FindUserByIdController';

const controller = new FindUserByIdController();
describe('FindUserById', () => {
    it('should return a 200 status code and the user object when a valid id is provided', async () => {
        const mockRequest = {
            body: {
                id: 'validId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.user.findFirst = jest
            .fn()
            .mockResolvedValue({ id: 'validId', name: 'John Doe' });

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            id: 'validId',
            name: 'John Doe'
        });
    });
    it('should return a 404 status code and an error message when the user is not found', async () => {
        const mockRequest = {
            body: {
                id: 'invalidId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.user.findFirst = jest.fn().mockResolvedValue(null);

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'User is not found!'
        });
    });
    it('should return a 404 status code and an error message when an unexpected error occurs', async () => {
        const mockRequest = {
            body: {
                id: 'validId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.user.findFirst = jest
            .fn()
            .mockRejectedValue(new Error('Unexpected error'));

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error in search user!'
        });
    });
    it('should return a 401 status code and an error message when the id is null', async () => {
        const mockRequest = {
            body: {
                id: null
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: "Id can't null!Please writing id correct!"
        });
    });
    it('should return a 401 status code and an error message when the id is undefined', async () => {
        const mockRequest = {
            body: {
                id: undefined
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: "Id can't null!Please writing id correct!"
        });
    });
    it('should handle errors thrown by prismaClient', async () => {
        const mockRequest = {
            body: {
                id: 'validId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.user.findFirst = jest
            .fn()
            .mockRejectedValue(new Error('Prisma error'));

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error in search user!'
        });
    });
});
