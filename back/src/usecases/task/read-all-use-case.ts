import { Task } from "@domain/entities/task";
import { ITaskRepository } from "@domain/repositories/task-repository";


export class ReadAllTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(userId: number): Promise<Task[]> {
        try {
            const tasks = await this.taskRepository.getAll(userId);

            if (!tasks) {
                throw new Error("Failed to get tasks");
            }

            return tasks;
        } catch (error: any) { 
            throw new Error(`Error in get all task use case: ${error.message}`);
        } 
    }
} 