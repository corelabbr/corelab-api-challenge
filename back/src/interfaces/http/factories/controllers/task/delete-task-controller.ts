import { PrismaTaskRepository } from "@infrastructure/repositories/task-repositories";
import { DeleteTaskController } from "@interfaces/controllers/task/delete-task-controller";
import { DeleteTaskUseCase } from "@usecases/task/delete-task-use-case";


export const makeDeleteTaskController = () => {
    const taskRepository = new PrismaTaskRepository();
    const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
    return new DeleteTaskController(deleteTaskUseCase);
}
