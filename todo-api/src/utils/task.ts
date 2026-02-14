import { type Task } from '@prisma/client'
import { prisma } from '../lib/prisma'

export const findTask = async (taskId: string): Promise<Task | null> => {
  const task = await prisma.task.findUnique({
    where: {
      id: taskId
    }
  })
  return task
}
