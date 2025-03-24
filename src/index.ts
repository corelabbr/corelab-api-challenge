import dotenv from 'dotenv';
dotenv.config();
import { CreateTaskUsecase } from "./usecases/task/createTask.usecase";
import TasksInfrastructureRepository from "./Infrastructures/repositories/taks/tasks.infrastructure.repository";
import { banco } from "./Infrastructures/package/banco";
import DeleteTaskUsecase from "./usecases/task/deleteTask.usecase";
import GetTaskByIdUsecase from "./usecases/task/getTaskById.usecase";
import GetTasksUsecase from "./usecases/task/getTasks.usecase";
import UpdateTaskUsecase from "./usecases/task/updateTask.usecase";
import { CreateTaskRoute } from "./Infrastructures/express/routes/task/createTask.express.route";
import { ApiExpress } from "./Infrastructures/express/api.express";
import { DeleteTaskRoute } from './Infrastructures/express/routes/task/deleteTask.express.route';
import { GetTaskByIdRoute } from './Infrastructures/express/routes/task/getTaskById.express.route';
import { GetTasksRoute } from './Infrastructures/express/routes/task/GetTasks.express.route';
import { UpdateTaskRoute } from './Infrastructures/express/routes/task/updateTask.express.route';
import GetTasksFavoriteUsecase from './usecases/task/getTasksFavorite.usecase';
import { GetTasksFavoriteRoute } from './Infrastructures/express/routes/task/getTasksFavorite.express.route';

async function main() {
  await banco.ensureTablesExist()
  const repository = TasksInfrastructureRepository.create(banco)
  const createTaskUsecase = CreateTaskUsecase.create(repository)
  const deleteTaskUsecase = DeleteTaskUsecase.create(repository)
  const getTaskByIdUsecase = GetTaskByIdUsecase.create(repository)
  const getTaks = GetTasksUsecase.create(repository)
  const updateTaskUsecase = UpdateTaskUsecase.create(repository)
  const getTasksFavoriteUsecase = GetTasksFavoriteUsecase.create(repository)

  const createTaskRoute = CreateTaskRoute.create(createTaskUsecase)
  const deleteTaskRoute = DeleteTaskRoute.create(deleteTaskUsecase)
  const getTaskByIdRoute = GetTaskByIdRoute.create(getTaskByIdUsecase)
  const getTasksRoute = GetTasksRoute.create(getTaks)
  const updateTaskRoute = UpdateTaskRoute.create(updateTaskUsecase)
  const getTasksFavoriteRoute = GetTasksFavoriteRoute.create(getTasksFavoriteUsecase)

  const api = ApiExpress.create([createTaskRoute, deleteTaskRoute, getTaskByIdRoute, getTasksRoute, updateTaskRoute, getTasksFavoriteRoute])

  api.start(process.env.PORT || 3000)
}

main()