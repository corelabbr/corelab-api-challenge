import { container } from "tsyringe";
import { ITaskRepository } from "modules/task/repositories/ITaskRepository";
import { TaskRepository } from "modules/task/repositories/implementations/TaskRepository";


container.registerSingleton<ITaskRepository>('TaskRepository', TaskRepository)