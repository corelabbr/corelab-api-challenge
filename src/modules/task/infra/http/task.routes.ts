import { Router } from 'express';
import { createTaskSchema, updateTaskSchema } from 'modules/task/schemas/task.schema';
import { CreateTaskController } from 'modules/task/useCases/createTask/CreateTaskController';
import { DeleteTaskController } from 'modules/task/useCases/deleteTask/DeleteTaskController';
import { GetTaskByIdController } from 'modules/task/useCases/getTaskById/GetTaskByIdController';
import { GetTasksController } from 'modules/task/useCases/getTasks/GetTasksController';
import { UpdateTaskController } from 'modules/task/useCases/updateTask/UpdateTaskController';
import { validate } from 'shared/infra/http/middlewares/validate.middleware';

const taskRoutes = Router();

const getControllerTasks = new GetTasksController();
const createControllerTask = new CreateTaskController();
const getTaskByIdController = new GetTaskByIdController();
const updateTaskController = new UpdateTaskController();
const deleteTaskController = new DeleteTaskController();

taskRoutes.post('/', validate(createTaskSchema), createControllerTask.handle);
taskRoutes.get('/', getControllerTasks.handle);
taskRoutes.get('/:id', getTaskByIdController.handle);
taskRoutes.put('/:id', validate(updateTaskSchema), updateTaskController.handle);
taskRoutes.delete('/:id', deleteTaskController.handle);

export { taskRoutes };
