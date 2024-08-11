import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ITask } from '@/interfaces/ITask'
import { Task } from '@/entities/task'

export class PrismaTaskRepoisory implements ITask {
    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        const task = await prisma.task.create({
            data
        })

        return new Task(task)
    }

    async editTask(id: string, title: string, content: string, color: string | '#FFFFFF' | '#BAE2FF' | '#B9FFDD' | '#FFE8AC' | '#FFCAB9' | '#F99494' | '#9DD6FF' | '#ECA1FF' | '#DAFF8B' | '#FFA285' | '#CDCDCD' | '#979797' | '#A99A7C'): Promise<Task> {
        const task = await prisma.task.update({
            where: {
                id: id
            },
            data: {
                title,
                content,
                color
            }
        })

        return task
    }

    async setFavorite(id: string, favorite: boolean): Promise<Task> {
        const task = await prisma.task.update({
            where: {
                id: id
            },
            data: {
                favorite
            }
        })

        return task
    }

    async getTasks(): Promise<Task[] | null> {
        const tasks = prisma.task.findMany({
            where: {
                favorite: false
            },
            orderBy: {
                created_at: 'desc'
            },
            select: {
                id: true,
                title: true,
                content: true,
                color: true,
                favorite: true,
                created_at: true,
                file: {
                    select: {
                        file_name: true
                    }
                }
            }
        })

        return tasks
    }

    async getFavoriteTasks(): Promise<Task[] | null> {
        const tasks = prisma.task.findMany({
            where: {
                favorite: true
            },
            orderBy: {
                created_at: 'desc'
            },
            select: {
                id: true,
                title: true,
                content: true,
                color: true,
                favorite: true,
                created_at: true,
                file: {
                    select: {
                        file_name: true
                    }
                }
            }
        })

        return tasks
    }

    async findTask(id: string): Promise<Task | null> {
        const task = prisma.task.findUnique({
            where: {
                id
            }
        })

        return task
    }

    async deleteTask(id: string): Promise<object | null> {
        await prisma.task.delete({
            where: {
                id: id
            }
        })

        return null
    }
    
}
