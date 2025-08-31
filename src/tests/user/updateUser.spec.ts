import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { UpdateUserController } from '../../controllers/users/UpdateUserController';
import { error } from 'console';

const controller = new UpdateUserController();

describe('updateUser', ()=>{
    it('should update user with all required fields and image', async () => {
        const mockRequest = {
            body: {
                id: 'validId',
                userName: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password',
                imgId: 'imageId'
            },
            file: {
                buffer: Buffer.from('imageBuffer')
            }
        } as Request;
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        prismaClient.user.update = jest
            .fn()
            .mockResolvedValue({
                id: 'validId',
                userName: 'John Doe',
                email: 'johndoe@example.com',
                password: 'password'
            });

        await controller.handle(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            id: 'validId',
            userName: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password'
        });
    });
      it('should return 500 status code and error message if id is not provided', async () => {
          const mockRequest = {
              body: {
                  userName: 'John Doe',
                  email: 'johndoe@example.com',
                  password: 'password',
                  imgId: 'imageId'
              }
          } as Request;
          const mockResponse = {
              status: jest.fn().mockReturnThis(),
              json: jest.fn()
          } as unknown as Response;
          prismaClient.user.update = jest
              .fn()
              .mockRejectedValue(new Error('Unexpected error'));
          await controller.handle(mockRequest, mockResponse);

          expect(mockResponse.status).toHaveBeenCalledWith(500);
          expect(mockResponse.json).toHaveBeenCalledWith({
              msg: 'unexpected error in update user!'
          });
      });
})