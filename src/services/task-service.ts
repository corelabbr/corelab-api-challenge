import { taskRepository } from '@/repositories';
import { invalidInputError } from '@/errors';
import { AuthenticatedRequest } from '@/middlewares';
import { Task } from '@prisma/client';

interface CreateTaskParams {
  req: AuthenticatedRequest;
  title: string;
  description: string;
  favorite?: boolean;
  color?: string;
}

async function createTaskService({
  req,
  title,
  description,
  favorite,
  color,
}: CreateTaskParams): Promise<Task> {
  const userId = req.userId;

  if (!title || !description || userId === undefined) {
    throw invalidInputError('All required fields must be filled.');
  }
  const newTask = await taskRepository.createTask(userId, {
    title,
    description,
    favorite,
    color,
  });
  return newTask;
}

export const taskService = {
  createTaskService,
};
