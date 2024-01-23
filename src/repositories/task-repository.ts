// taskRepository.ts
import { prisma } from '@/config';
import { TaskData } from '@/types';
import { Task } from '@prisma/client';

interface TaskRepository {
  createTask(userId: number, data: TaskData): Promise<Task>;
  findAllTaskByUserId(userId: number): Promise<Task[] | null>;
  deleteTask(taskId: number): Promise<void>;
  findTaskByIdAndUserId(taskId: number, userId: number): Promise<Task | null>;
  updateTask(taskId: number, data: Partial<TaskData>): Promise<Task>;
}

async function createTask(userId: number, data: TaskData): Promise<Task> {
  return prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
}

async function findAllTaskByUserId(userId: number): Promise<Task[] | null> {
  const tasks = await prisma.task.findMany({ where: { userId } });
  return tasks ?? null;
}

async function deleteTask(taskId: number): Promise<void> {
  await prisma.task.delete({ where: { id: taskId } });
}

async function findTaskByIdAndUserId(taskId: number, userId: number): Promise<Task | null> {
  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  return task ?? null;
}

async function updateTask(
  taskId: number,
  data: Pick<Task, 'title' | 'description' | 'favorite' | 'color'>,
): Promise<Task> {
  const updatedTask = await prisma.task.update({
    where: { id: taskId },
    data,
  });

  return updatedTask;
}

export const taskRepository: TaskRepository = {
  createTask,
  findAllTaskByUserId,
  deleteTask,
  findTaskByIdAndUserId,updateTask
};
