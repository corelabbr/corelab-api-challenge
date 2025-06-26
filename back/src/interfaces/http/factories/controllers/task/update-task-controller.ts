import { PrismaTaskRepository } from "@infrastructure/repositories/task-repositories";
import { UpdateTaskController } from "@interfaces/controllers/task/update-task-controller";
import { UpdateTaskUseCase } from "@usecases/task/update-task-use-case";

export const makeUpdateTaskController = () => {
    const taskRepository = new PrismaTaskRepository();
    const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
    return new UpdateTaskController(updateTaskUseCase);
}