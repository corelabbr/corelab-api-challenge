import prisma from '../../database/prisma-client'
import { TaskRepository } from './task-repository'
import { Task } from '../../models/task'

class TaskRepositoryHandler implements TaskRepository {
  public async findById(id: string): Promise<Task | null> {
    const data = await prisma.task.findUnique({
      where: {
        id,
      },
    })
    if (!data) return null
    const task = Task.create({
      title: data.title,
      body: data.body,
      color: data.color,
      completed: data.completed,
      favorited: data.favorited,
    })

    return task
  }
  public async save(task: Task): Promise<Task> {
    const data = await prisma.task.create({
      data: {
        title: task.title,
        body: task.body,
        color: task.color,
        completed: task.completed ?? false,
        favorited: task.favorited,
      },
    })

    const newTask = Task.create({
      id: data.id,
      title: data.title,
      body: data.body,
      color: data.color,
      completed: data.completed,
      favorited: data.favorited,
    })

    return newTask
  }
  public async complete(id: string): Promise<void> {
    try {
      await prisma.task.update({
        where: {
          id,
        },
        data: {
          completed: true,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  public async uncomplete(id: string): Promise<void> {
    try {
      await prisma.task.update({
        where: {
          id,
        },
        data: {
          completed: false,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  public async favorite(id: string): Promise<void> {
    try {
      prisma.task.update({
        where: {
          id,
        },
        data: {
          favorited: true,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }
  public async unfavorite(id: string): Promise<void> {
    try {
      prisma.task.update({
        where: {
          id,
        },
        data: {
          favorited: false,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }
}

export default TaskRepositoryHandler
