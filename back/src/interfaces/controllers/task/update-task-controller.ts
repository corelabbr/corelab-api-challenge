import { Request, Response } from 'express';
import { PrismaTaskRepository } from '@infrastructure/repositories/task-repositories';
import { UpdateTaskUseCase } from '@usecases/task/update-task-use-case';
import { UpdateTaskDTO } from '@domain/dtos/task/update-task-dto';

export class UpdateTaskController {
    constructor(
        private readonly updateTaskUseCase: UpdateTaskUseCase
    ) {}

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const taskId = req.params.id;
            const taskData = UpdateTaskController.extractTaskData(req.body);

            if (Object.keys(taskData).length === 0) {
                return res.status(400).json({ message: 'At least one field must be provided to update the task.' });
            }

            const updatedTask = await this.updateTaskUseCase.execute(Number(taskId), taskData);
            
            if (!updatedTask) {
                return res.status(404).json({ message: 'Failed to update task' });
            }

            return res.status(200).json(updatedTask);
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }

    private static extractTaskData(body: any): Partial<UpdateTaskDTO> {
        const { titulo, descricao, dataPrevista, prioridade, status, cor } = body;
        const taskData: Partial<UpdateTaskDTO> = {};

        if (dataPrevista !== undefined) {
            const [datePart] = dataPrevista.split(",");

            if (datePart && datePart.includes("/")) {
                const [day, month, year] = datePart.split("/").map(Number);
                const formattedDate = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                taskData.dataPrevista = new Date(formattedDate);
            } else if (datePart && datePart.includes("-")) {
                taskData.dataPrevista = new Date(datePart);
            } else {
                taskData.dataPrevista = new Date(dataPrevista);
            }
            }

        if (titulo !== undefined) taskData.titulo = titulo;
        if (descricao !== undefined) taskData.descricao = descricao;
        if (prioridade !== undefined) taskData.prioridade = prioridade;
        if (status !== undefined) taskData.status = status;
        if (cor !== undefined) taskData.cor = cor;

        return taskData;
    }

}
