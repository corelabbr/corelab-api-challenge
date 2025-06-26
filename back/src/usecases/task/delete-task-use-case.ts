import { ITaskRepository } from "@domain/repositories/task-repository";


export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(taskId: number): Promise<void> {
        try {
            const deleteTask = await this.taskRepository.deleteTask(taskId);

            if (deleteTask === false) {
                throw new Error("Failed to delete task");
            }

        } catch (error: any) {
            throw new Error(`Error in delete task use case: ${error.message}`);
        }
    }
}