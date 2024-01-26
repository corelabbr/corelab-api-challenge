import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { FindAllUsersController } from '../../controllers/users/FindAllUsersController';

const controller = new FindAllUsersController();

describe('FindAllUsersController', () => {
    it('should retrieve all users from the database', async () => {
        prismaClient.user.findMany = jest.fn().mockResolvedValue([]);
        const mockRequest = {} as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(expect.any(Array));
    });
    it('should return an error message when an unexpected error occurs', async () => {
        const mockRequest = {} as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.user.findMany = jest
            .fn()
            .mockRejectedValueOnce(new Error('Unexpected error'));

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Unexpected error in search users!Please reload page and try again!'
        });
    });
});
