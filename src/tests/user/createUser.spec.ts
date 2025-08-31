import { Request, Response } from 'express';
import { CreateUsersController } from '../../controllers/users/CreateUsersController';
import { prismaClient } from '../../database/prismaClient';

const controller = new CreateUsersController();

describe('CreateUsersController', () => {
    it('should create a user with all required fields', async () => {
        prismaClient.user.create = jest.fn().mockResolvedValue({});
        const mockRequest = {
            body: {
                userName: 'JohnDoe',
                email: 'johndoe@example.com',
                password: 'password123'
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(201);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'User as created!',
            users: expect.any(Object)
        });
    });
    it('should return a 500 status code and an error message when there is an error creating the user', async () => {
        const mockRequest = {
            body: {
                userName: 'JohnDoe',
                email: 'johndoe@example.com',
                
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
     
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Fields cannot empty or nulls!'
        });
    });
    it('should handle requests with missing all fields', async () => {
        const mockRequest = {
            body: {}
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Fields cannot empty or nulls!'
        });
    });
});
