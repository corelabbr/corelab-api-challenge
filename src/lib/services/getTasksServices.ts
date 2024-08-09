import { TaskRepository } from '@/repositories/taskRepository'

interface getTasksServicesResponse {
    tasks: object | null
}

export class GetTasksServices {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute(): Promise<getTasksServicesResponse> {
        const tasks = await this.taskRepository.getTasks()

        return {
            tasks
        }
    }
}
