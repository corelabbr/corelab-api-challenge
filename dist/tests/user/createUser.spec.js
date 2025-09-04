"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUsersController_1 = require("../../controllers/users/CreateUsersController");
const prismaClient_1 = require("../../database/prismaClient");
const controller = new CreateUsersController_1.CreateUsersController();
describe('CreateUsersController', () => {
    it('should create a user with all required fields', async () => {
        prismaClient_1.prismaClient.user.create = jest.fn().mockResolvedValue({});
        const mockRequest = {
            body: {
                userName: 'JohnDoe',
                email: 'johndoe@example.com',
                password: 'password123'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
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
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Fields cannot empty or nulls!'
        });
    });
    it('should handle requests with missing all fields', async () => {
        const mockRequest = {
            body: {}
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(404);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Fields cannot empty or nulls!'
        });
    });
});
