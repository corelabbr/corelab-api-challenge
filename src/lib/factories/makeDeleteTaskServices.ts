import { PrismaTaskRepoisory } from '@/repositories/prisma/prismaTaskRepository'
import { DeleteTaskServices } from '../services/deleteTaskServices'

export function makeDeleteTaskServices() {
    const taskRepository = new PrismaTaskRepoisory()
    const service = new DeleteTaskServices(taskRepository)

    return service
}
