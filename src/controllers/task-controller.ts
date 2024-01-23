import { Response } from 'express'
import { taskService} from '@/services'
import httpStatus from 'http-status'
import { AuthenticatedRequest } from '@/middlewares'

export async function createTaskController(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const { title,description,favorite, color } = req.body

  const newTask = await taskService.createTaskService({ req,title,description,favorite,color })

  res.status(httpStatus.CREATED).json(newTask)
}

export async function findAllTaskByUserIdController(
  req: AuthenticatedRequest, res: Response,): Promise<void>{
  const tasks = await taskService.findAllTaskByUserIdService( req )
  res.status(httpStatus.OK).json(tasks)
  }


export async function deleteTaskController(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const { taskId } = req.params;

  await taskService.deleteTaskService({ req, taskId }); 
  res.status(httpStatus.NO_CONTENT).send();
}

export async function updateTaskController(
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> {
  const { taskId } = req.params;
  const { title, description, favorite, color } = req.body;

  const updatedTask = await taskService.updateTaskService({
    req,
    taskId: parseInt(taskId, 10),
    title,
    description,
    favorite,
    color,
  });

  res.status(httpStatus.OK).json(updatedTask);
}