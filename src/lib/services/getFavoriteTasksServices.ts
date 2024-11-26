import { Task } from '@/entities/task'
import { TaskRepository } from '@/repositories/taskRepository'

interface getFavoriteTasksServicesResponse {
    tasks: Task[] | null
}

export class GetFavoriteTasksServices {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute(): Promise<getFavoriteTasksServicesResponse> {
        const tasks = await this.taskRepository.getFavoriteTasks()

        return {
            tasks
        }
    }
}
