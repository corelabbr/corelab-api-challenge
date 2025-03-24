import { ApiExpress } from './api.express';
import TasksInfrastructureRepository from '../repositories/taks/tasks.infrastructure.repository';
import { banco } from '../package/banco';
import { CreateTaskUsecase } from '../../usecases/task/createTask.usecase';
import DeleteTaskUsecase from '../../usecases/task/deleteTask.usecase';
import GetTaskByIdUsecase from '../../usecases/task/getTaskById.usecase';
import GetTasksUsecase from '../../usecases/task/getTasks.usecase';
import UpdateTaskUsecase from '../../usecases/task/updateTask.usecase';
import GetTasksFavoriteUsecase from '../../usecases/task/getTasksFavorite.usecase';

import {
    CreateTaskRoute,
    DeleteTaskRoute,
    GetTaskByIdRoute,
    GetTasksRoute,
    UpdateTaskRoute,
    GetTasksFavoriteRoute
} from './routes/task/index.express.route';

export async function createApp() {
    await banco.ensureTablesExist();

    const repository = TasksInfrastructureRepository.create(banco);
    const routes = [
        CreateTaskRoute.create(CreateTaskUsecase.create(repository)),
        DeleteTaskRoute.create(DeleteTaskUsecase.create(repository)),
        GetTaskByIdRoute.create(GetTaskByIdUsecase.create(repository)),
        GetTasksRoute.create(GetTasksUsecase.create(repository)),
        UpdateTaskRoute.create(UpdateTaskUsecase.create(repository)),
        GetTasksFavoriteRoute.create(GetTasksFavoriteUsecase.create(repository))
    ];

    const api = ApiExpress.create(routes);
    return api.getApp();
}
