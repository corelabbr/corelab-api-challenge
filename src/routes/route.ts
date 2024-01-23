import express from 'express';
import TaskController from '../controllers/TaskController';

const routes = express.Router();

routes.get('/', TaskController.GetTasks);
routes.post("/createTask", TaskController.CreateTask);
routes.post("/editTask/:id", TaskController.UpdateTask);
module.exports = routes;