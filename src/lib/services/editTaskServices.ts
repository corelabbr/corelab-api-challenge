import { Task } from '@/entities/task'
import { TaskRepository } from '@/repositories/taskRepository'
import { TaskDoesNotExistError } from './errors/taskDoesNotExistError'
import { MissingFieldsError } from './errors/missingFieldsError'
import { InvalidColorError } from './errors/invalidColorError'

interface editTaskServicesParams {
    id: string
    title: string
    content: string
    color: string | 'white' | 'blue' | 'green' | 'yellow' | 'salmon' | 'red' | 'blue2' | 'pink' | 'lemon' | 'orange' | 'gray' | 'gray2' | 'brown'
}

interface editTaskServicesReponse {
    task: Task
}

export class EditTaskServices {
    constructor(
        private taskRepository: TaskRepository
    ) { }

    async execute({ id, title, content, color }: editTaskServicesParams): Promise<editTaskServicesReponse> {
        const doesTaskExist = await this.taskRepository.findTask(id)
        const validColors = ['white', 'blue', 'green', 'yellow', 'salmon', 'red', 'blue2', 'pink', 'lemon', 'orange', 'gray', 'gray2', 'brown']
        let isValid = false

        if (!doesTaskExist) {
            throw new TaskDoesNotExistError()
        }

        if(title === "" || content === "") {
            throw new MissingFieldsError()
        }

        for(let i = 0; i < validColors.length; i++) {
            if(color === validColors[i]) {
                isValid = true
                break
            }
        }

        if(!isValid) {
            throw new InvalidColorError()
        }

        const task = await this.taskRepository.editTask(id, title, content, color)

        return {
            task
        }
    }
}
