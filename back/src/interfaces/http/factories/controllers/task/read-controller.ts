import { PrismaTaskRepository } from "@infrastructure/repositories/task-repositories";
import { ReadAllTaskController } from "@interfaces/controllers/task/read-controller";
import { ReadAllTaskUseCase } from "@usecases/task/read-all-use-case";

export const makeReadController = () => {
    const taskRepository = new PrismaTaskRepository();
    const readAllTaskUseCase = new ReadAllTaskUseCase(taskRepository);
    return new ReadAllTaskController(readAllTaskUseCase);
}