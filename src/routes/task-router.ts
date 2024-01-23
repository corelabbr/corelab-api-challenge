import { Router } from 'express'
import { createTaskController, deleteTaskController, findAllTaskByUserIdController, updateTaskController } from '@/controllers'
import { authenticateToken } from '@/middlewares'

const taskRouter: Router = Router()

taskRouter.post('/create', authenticateToken,createTaskController)
taskRouter.get('/', authenticateToken, findAllTaskByUserIdController)
taskRouter.delete('/:taskId', authenticateToken, deleteTaskController)
taskRouter.put('/:taskId', authenticateToken,updateTaskController)




export { taskRouter }
