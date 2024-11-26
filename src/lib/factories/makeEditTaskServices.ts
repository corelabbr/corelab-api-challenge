import { PrismaTaskRepoisory } from '@/repositories/prisma/prismaTaskRepository'
import { EditTaskServices } from '../services/editTaskServices'

export function makeEditTaskServices() {
    const taskRepository = new PrismaTaskRepoisory()
    const service = new EditTaskServices(taskRepository)

    return service
}
