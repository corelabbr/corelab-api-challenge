import { Tarefa } from "@prisma/client";
import { UpdateTaskDTO } from "@domain/dtos/task/update-task-dto";
import { ITaskRepository } from "@domain/repositories/task-repository";


export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(taskId: number, taskData: UpdateTaskDTO): Promise<Tarefa> {
        try {
            const updatedTask = await this.taskRepository.update(taskId, taskData);

            if (!updatedTask) {
                throw new Error("Failed to update task");
            }

            return updatedTask;
        } catch (error: any) { 
            throw new Error(`Error in update task use case: ${error.message}`);
        } 
    }
}