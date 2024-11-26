import { TaskRepository } from '@/repositories/taskRepository'
import { TaskDoesNotExistError } from './errors/taskDoesNotExistError'

interface deleteTaskServicesParams {
    id: string
}

interface deleteTaskServicesResponse {
    task: object | null
}

export class DeleteTaskServices {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute({ id }: deleteTaskServicesParams): Promise<deleteTaskServicesResponse> {
        const doesTaskExist = await this.taskRepository.findTask(id)

        if (!doesTaskExist) {
            throw new TaskDoesNotExistError()
        }

        const task = await this.taskRepository.deleteTask(id)

        return {
            task
        }
    }
}
