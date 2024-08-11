import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { DeleteTaskServices } from '../deleteTaskServices'
import { beforeEach, describe, expect, it } from 'vitest'
import { TaskDoesNotExistError } from '../errors/taskDoesNotExistError'

let taskRepository: MemoryTaskRepository
let sut: DeleteTaskServices

describe('DeleteTaskServices', () => {
    beforeEach(() => {
        taskRepository = new MemoryTaskRepository()
        sut = new DeleteTaskServices(taskRepository)
    })

    it('Must delete one Task', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#D9D9D9'
        })

        await taskRepository.create({
            id: '12149071-e525-42e9-b80e-65ad9c316141',
            title: 'test',
            content: 'content',
            color: '#D9D9D9',
            favorite: true
        })

        const { task } = await sut.execute({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552'
        })

        expect(task).toHaveLength(1)
    })

    it('Must return an Error due to non-existent Task', async () => {
        await expect(() => 
            sut.execute({
                id: 'a9acb560-968c-4232-826e-d64fe0bdb552'
            })
        ).rejects.toBeInstanceOf(TaskDoesNotExistError)
    })
})
