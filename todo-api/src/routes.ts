import { Router } from 'express'
import TaskController from './controllers/TaskController'
import { verifyTask } from './middlewares/verifyTask'

export const routes = Router()

routes.post('/', TaskController.create)
routes.get('/', TaskController.index)
routes.put('/task/:id', verifyTask, TaskController.update)
routes.delete('/task/:id', verifyTask, TaskController.destroy)
routes.patch('/task/:id', verifyTask, TaskController.updateFavorite)
routes.patch('/task/:id/color', verifyTask, TaskController.changeColor)
