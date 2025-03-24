import { TaskEntity } from "../entities/task.entity";

export interface TaskGateway {
    createTask(Task: TaskEntity): Promise<void>;
    getTaskById(id: string): Promise<TaskEntity>;
    getTasks(): Promise<TaskEntity[]>;
    updateTask(Task: TaskEntity): Promise<void>;
    deleteTask(id: string): Promise<void>;
    getTasksFavorite(): Promise<TaskEntity[]>;
}