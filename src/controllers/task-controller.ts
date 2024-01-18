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
