import { Tarefa } from "@prisma/client";
import { CreateTaskDTO } from "@domain/dtos/task/create-task-dto";

export interface ITaskRepository {
    create(task: CreateTaskDTO): Promise<Tarefa>;
    getAll(userId: number): Promise<Tarefa[]>;
    update(taskId: number, taskData: Partial<Tarefa>): Promise<Tarefa>;
    deleteTask(taskId: number): Promise<boolean>;
}