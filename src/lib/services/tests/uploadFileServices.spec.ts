import { MemoryFileRepository } from '@/repositories/memory/memoryFileRepository'
import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { UploadFileServices } from '../uploadFileServices'
import { beforeEach, describe, expect, it } from 'vitest'
import { TaskAlreadyHaveFileError } from '../errors/taskAlreadyHaveFileError'

let fileRepository: MemoryFileRepository
let taskRepository: MemoryTaskRepository
let sut: UploadFileServices

describe('UploadFileServices', () => {
    beforeEach(() => {
        fileRepository = new MemoryFileRepository()
        taskRepository = new MemoryTaskRepository()
        sut = new UploadFileServices(fileRepository)
    })

    it('Must upload the File', async () => {
        await taskRepository.create({
            id: 'dacb857b-146a-42e8-9d09-a2bdd0844b7c',
            title: 'title',
            content: 'content',
            color: '#FFFFFF'
        })

        const { file } = await sut.execute({
            file_name: 'random.png',
            task_id: 'dacb857b-146a-42e8-9d09-a2bdd0844b7c'
        })

        expect(file.id).toEqual(expect.any(String))
    })

    it('Must return a Error due to already having an File in the Task', async () => {
        await taskRepository.create({
            id: 'dacb857b-146a-42e8-9d09-a2bdd0844b7c',
            title: 'title',
            content: 'content',
            color: '#FFFFFF'
        })

        await fileRepository.upload({
            file_name: 'random.png',
            task_id: 'dacb857b-146a-42e8-9d09-a2bdd0844b7c'
        })

        await expect(() =>
            sut.execute({
                file_name: 'random2.png',
                task_id: 'dacb857b-146a-42e8-9d09-a2bdd0844b7c'
            })
        ).rejects.toBeInstanceOf(TaskAlreadyHaveFileError)
    })
})
