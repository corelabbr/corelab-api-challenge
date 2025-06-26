import { PrismaTaskRepository } from "@infrastructure/repositories/task-repositories";
import { CreateTaskController } from "@interfaces/controllers/task/create-controller";
import { CreateTaskUseCase } from "@usecases/task/create-use-case";

export const makeCreateController = () => {
    const taskRepository = new PrismaTaskRepository();
    const createTaskUseCase = new CreateTaskUseCase(taskRepository);
    return new CreateTaskController(createTaskUseCase);
};