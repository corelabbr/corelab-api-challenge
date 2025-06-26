import { CreateTaskDTO } from "@domain/dtos/task/create-task-dto";
import { Task } from "@domain/entities/task";
import { ITaskRepository } from "@domain/repositories/task-repository";

export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(task: CreateTaskDTO): Promise<Task> {
        try {
            const newTask = await this.taskRepository.create(task);

            if (!newTask) {
                throw new Error("Failed to create task");
              }
            
            return newTask
        } catch (error: any) { 
            throw new Error(`Error in create task use case: ${error.message}`);
          } 
    }
}