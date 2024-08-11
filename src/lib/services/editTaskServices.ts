import { Task } from '@/entities/task'
import { TaskRepository } from '@/repositories/taskRepository'
import { TaskDoesNotExistError } from './errors/taskDoesNotExistError'
import { MissingFieldsError } from './errors/missingFieldsError'
import { InvalidColorError } from './errors/invalidColorError'

interface editTaskServicesParams {
    id: string
    title: string
    content: string
    color: string | '#FFFFFF' | '#BAE2FF' | '#B9FFDD' | '#FFE8AC' | '#FFCAB9' | '#F99494' | '#9DD6FF' | '#ECA1FF' | '#DAFF8B' | '#FFA285' | '#CDCDCD' | '#979797' | '#A99A7C'
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
        const validColors = ['#FFFFFF', '#BAE2FF', '#B9FFDD', '#FFE8AC', '#FFCAB9', '#F99494', '#9DD6FF', '#ECA1FF', '#DAFF8B', '#FFA285', '#CDCDCD', '#979797', '#A99A7C']
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
