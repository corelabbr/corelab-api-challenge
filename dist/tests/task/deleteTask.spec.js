"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DeleteTaskController_1 = require("../../controllers/tasks/DeleteTaskController");
const prismaClient_1 = require("../../database/prismaClient");
jest.mock('../../database/prismaClient', () => ({
    prismaClient: {
        task: {
            delete: jest.fn()
        }
    }
}));
describe('DeleteTaskController', () => {
    let deleteTaskController;
    let mockRequest;
    let mockResponse;
    beforeEach(() => {
        deleteTaskController = new DeleteTaskController_1.DeleteTaskController();
        mockRequest = {
            body: { id: '123' }
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
    it('deve deletar a task com sucesso e retornar status 200', async () => {
        prismaClient_1.prismaClient.task.delete = jest
            .fn()
            .mockResolvedValueOnce({
            id: '123',
            task: 'Tarefa teste',
            userId: 'user123'
        });
        await deleteTaskController.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.task.delete).toHaveBeenCalledWith({
            where: { id: '123' }
        });
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Task deleted successfully!',
            deleteTask: expect.any(Object)
        });
    });
    it('deve retornar erro 500 caso ocorra exceção', async () => {
        prismaClient_1.prismaClient.task.delete.mockRejectedValueOnce(new Error('Erro ao deletar'));
        await deleteTaskController.handle(mockRequest, mockResponse);
        expect(prismaClient_1.prismaClient.task.delete).toHaveBeenCalledWith({
            where: { id: '123' }
        });
        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            msg: 'Internal server error!'
        });
    });
});
