import { PrismaTaskRepoisory } from '@/repositories/prisma/prismaTaskRepository'
import { GetFavoriteTasksServices } from '../services/getFavoriteTasksServices'

export function makeGetFavoriteTasksServices() {
    const taskRepository = new PrismaTaskRepoisory()
    const service = new GetFavoriteTasksServices(taskRepository)

    return service
}
