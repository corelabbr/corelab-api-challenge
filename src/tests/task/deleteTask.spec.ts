import { DeleteTaskController } from '../../controllers/tasks/DeleteTaskController';
import { prismaClient } from '../../database/prismaClient';
import { Request, Response } from 'express';

// Mock do prismaClient
jest.mock('../../database/prismaClient', () => ({
  prismaClient: {
    task: {
      delete: jest.fn(),
    },
  },
}));

describe('DeleteTaskController', () => {
  let deleteTaskController: DeleteTaskController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    deleteTaskController = new DeleteTaskController();

    mockRequest = {
      body: { id: '123' },
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('deve deletar a task com sucesso e retornar status 200', async () => {
    (prismaClient.task.delete as jest.Mock)=jest.fn().mockResolvedValueOnce({
      id: '123',
      task: 'Tarefa teste',
       userId: 'user123',
    });

    await deleteTaskController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(prismaClient.task.delete).toHaveBeenCalledWith({
      where: { id: '123' },
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: 'Task deleted successfully!',
      deleteTask: expect.any(Object),
    });
  });

  it('deve retornar erro 400 caso ocorra exceção', async () => {
    (prismaClient.task.delete as jest.Mock).mockRejectedValueOnce(
      new Error('Erro ao deletar')
    );

    await deleteTaskController.handle(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(prismaClient.task.delete).toHaveBeenCalledWith({
      where: { id: '123' },
    });
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: 'Error deleting the task!',
    });
  });
});
