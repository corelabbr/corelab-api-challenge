import express from 'express'
import TaskController from '../controllers/TaskController'

const routes = express.Router()

routes.get('/', TaskController.GetTasks)
routes.post('/', TaskController.CreateTask)
routes.put('/:id', TaskController.UpdateTask)
routes.delete('/:id', TaskController.DeleteTask)
module.exports = routes
