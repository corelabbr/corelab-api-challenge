import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { DeleteUserByIdController } from '../../controllers/users/DeleteUserByIdController';

const controller = new DeleteUserByIdController();
describe('DeleteUserByIdController', () => {
    it('should delete a user when given a valid id', async () => {
        prismaClient.user.delete = jest.fn().mockResolvedValueOnce({});
        const mockRequest = {
            body: {
                id: 'validId'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        await controller.handle(mockRequest, mockResponse);
        expect(prismaClient.user.delete).toHaveBeenCalledWith({
            where: {
                id: 'validId'
            }
        });

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'User was deleted!'
        });
        expect(prismaClient.user.delete).toHaveBeenCalledWith({
            where: {
                id: 'validId'
            }
        });
    });

    it('should return 401 status code when id is null', async () => {
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
});
