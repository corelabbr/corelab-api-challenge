import { PrismaTaskRepoisory } from '@/repositories/prisma/prismaTaskRepository'
import { CreateTaskServices } from '../services/createTaskServices'

export function makeCreateTaskServices() {
    const taskRepository = new PrismaTaskRepoisory()
    const service = new CreateTaskServices(taskRepository)

    return service
}
