import { Router } from 'express';
import { body } from 'express-validator';
import { createTask, listTasks } from '../controllers/taskController';

const router = Router();

router.get('/tasks', listTasks);

router.post(
    '/tasks',
    body('title').isString().notEmpty().withMessage('Título é obrigatório'),
    body('description').optional().isString(),
    body('completed').optional().isBoolean(),
    body('favorite').optional().isBoolean(),
    body('color').optional().isString(),
    createTask
);

export { router };
