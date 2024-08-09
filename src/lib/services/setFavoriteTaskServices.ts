import { Task } from '@/entities/task'
import { TaskRepository } from '@/repositories/taskRepository'
import { TaskDoesNotExistError } from './errors/taskDoesNotExistError'

interface setFavoriteTaskServicesParams {
    id: string
    favorite: boolean
}

interface setFavoriteTaskServicesResponse {
    task: Task
}

export class SetFavoriteTaskServices {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute({ id, favorite }: setFavoriteTaskServicesParams): Promise<setFavoriteTaskServicesResponse> {
        const doesTaskExist = await this.taskRepository.findTask(id)

        if (!doesTaskExist) {
            throw new TaskDoesNotExistError()
        }

        const task = await this.taskRepository.setFavorite(id, favorite)

        return {
            task
        }
    }
}
