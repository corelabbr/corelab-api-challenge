import { PrismaTaskRepoisory } from '@/repositories/prisma/prismaTaskRepository'
import { GetTasksServices } from '../services/getTasksServices'

export function makeGetTasksServices() {
    const taskRepository = new PrismaTaskRepoisory()
    const service = new GetTasksServices(taskRepository)

    return service
}
