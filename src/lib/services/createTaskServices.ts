import { Task } from '@/entities/task'
import { TaskRepository } from '@/repositories/taskRepository'

interface createTaskServicesParams {
    id?: string
    title: string,
    content: string,
    color: string
}

interface createTaskServicesResponse {
    task: Task
}

export class CreateTaskServices {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute({ id, title, content, color }: createTaskServicesParams): Promise<createTaskServicesResponse> {
        const task = await this.taskRepository.create({
            id,
            title,
            content,
            color
        })

        return {
            task
        }
    }
}
