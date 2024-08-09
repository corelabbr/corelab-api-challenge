import { PrismaTaskRepoisory } from '@/repositories/prisma/prismaTaskRepository'
import { SetFavoriteTaskServices } from '../services/setFavoriteTaskServices'

export function makeSetFavoriteTaskServices() {
    const taskRepository = new PrismaTaskRepoisory()
    const service = new SetFavoriteTaskServices(taskRepository)

    return service
}
