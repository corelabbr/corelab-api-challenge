import { Router } from 'express'
import { createTaskController } from '@/controllers'
import { authenticateToken } from '@/middlewares'

const taskRouter: Router = Router()

taskRouter.post('/create', authenticateToken,createTaskController)

export { taskRouter }
