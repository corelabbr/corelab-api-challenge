import { File } from '@/entities/file'
import { FileRepository } from '@/repositories/fileRepository'
import { TaskAlreadyHaveFileError } from './errors/taskAlreadyHaveFileError'

interface uploadFileServicesParams {
    file_name: string
    task_id: string
}

interface uploadFileServicesResponse {
    file: File
}

export class UploadFileServices {
    constructor(
        private fileRepository: FileRepository
    ) { }

    async execute({ file_name, task_id }: uploadFileServicesParams ): Promise<uploadFileServicesResponse> {
        const doesTaskHasFile = await this.fileRepository.verify(task_id)

        if(doesTaskHasFile) {
            throw new TaskAlreadyHaveFileError()
        }

        const file = await this.fileRepository.upload({
            file_name,
            task_id
        })

        return {
            file
        }
    }
}
