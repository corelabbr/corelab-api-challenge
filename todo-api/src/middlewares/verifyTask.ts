import { type Response, type Request, type NextFunction } from 'express'
import { z } from 'zod'
import { findTask } from '../utils/task'

export const verifyTask = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined> => {
  try {
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramsSchema.parse(req.params)
    const taskExists = await findTask(id)

    if (taskExists === null) {
      return res.status(404).json({ error: 'Task not found' })
    }
    next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
