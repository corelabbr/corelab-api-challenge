"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoginController_1 = require("../../controllers/login/LoginController");
const prismaClient_1 = require("../../database/prismaClient");
const controller = new LoginController_1.LoginController();
describe('LoginController', () => {
    it('should successfully handle a valid login request with correct email and password', async () => {
        prismaClient_1.prismaClient.user.findFirst = jest
            .fn()
            .mockResolvedValue({
            email: 'test@example.com',
            password: 'password123'
        });
        const mockRequest = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Login sucessfully!',
            login: expect.any(Object)
        });
    });
    it('should return a 400 error if email is not found in the request body', async () => {
        const mockRequest = {
            body: {
                password: 'password123'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Email is not found!'
        });
    });
    it('should return a 401 error if password is not found in the request body', async () => {
        const mockRequest = {
            body: {
                email: 'test@example.com'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Password not found!'
        });
    });
    it('should handle a login request with empty email and password fields', async () => {
        prismaClient_1.prismaClient.user.findFirst = jest.fn();
        const mockRequest = {
            body: {
                email: 'sgfsdgsg',
                password: 'wdfsdfgsdg'
            }
        };
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await controller.handle(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(401);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Email or Password incorrect!'
        });
    });
});
