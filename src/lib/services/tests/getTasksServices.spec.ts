import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { GetTasksServices } from '../getTasksServices'
import { beforeEach, describe, expect, it } from 'vitest'

let taskRepository: MemoryTaskRepository
let sut: GetTasksServices

describe('GetTasksServices', () => {
    beforeEach(() => {
        taskRepository = new MemoryTaskRepository()
        sut = new GetTasksServices(taskRepository)
    })

    it('Must get Tasks', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: 'white',
            favorite: false
        })

        await taskRepository.create({
            id: '12149071-e525-42e9-b80e-65ad9c316141',
            title: 'test',
            content: 'content',
            color: 'white',
            favorite: true
        })

        const { tasks } = await sut.execute()

        expect(tasks).toHaveLength(1)
    })

    it('Tasks list must be null', async () => {
        const { tasks } = await sut.execute()

        expect(tasks).toEqual([])
    })
})
