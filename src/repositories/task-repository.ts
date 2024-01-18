import { prisma } from '@/config';
import { TaskData } from '@/types';
import {  Task } from '@prisma/client';


async function createTask(userId: number, data: TaskData): Promise<Task> {
  return prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
}

export const taskRepository = {
  createTask,
};
