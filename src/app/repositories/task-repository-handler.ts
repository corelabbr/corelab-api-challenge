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
        favorited: task.favorited,
      },
    })

    const newTask = Task.create({
      id: data.id,
      title: data.title,
      body: data.body,
      color: data.color,
      favorited: data.favorited,
    })

    return newTask
  }

  public async update(task: Task): Promise<Task> {
    const data = await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        title: task.title,
        body: task.body,
        color: task.color,
        favorited: task.favorited,
      },
    })

    const updatedTask = Task.create({
      id: data.id,
      title: data.title,
      body: data.body,
      color: data.color,
      favorited: data.favorited,
    })

    return updatedTask
  }

  public async delete(id: string): Promise<void> {
    try {
      await prisma.task.delete({
        where: {
          id,
        },
      })
    } catch (error) {
      throw new Error(error)
    }
  }

  public async getAll(): Promise<Task[]> {
    const data = await prisma.task.findMany()
    const tasks = data.map((task) => {
      return Task.create({
        id: task.id,
        title: task.title,
        body: task.body,
        color: task.color,
        favorited: task.favorited,
      })
    })

    return tasks
  }
}

export default TaskRepositoryHandler
