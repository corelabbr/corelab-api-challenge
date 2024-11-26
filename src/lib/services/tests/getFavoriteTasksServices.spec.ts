import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { GetFavoriteTasksServices } from '../getFavoriteTasksServices'
import { beforeEach, describe, expect, it } from 'vitest'

let taskRepository: MemoryTaskRepository
let sut: GetFavoriteTasksServices

describe('GetFavoriteTasksServices', () => {
    beforeEach(() => {
        taskRepository = new MemoryTaskRepository()
        sut = new GetFavoriteTasksServices(taskRepository)
    })

    it('Must get Favorite Tasks', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#FFFFFF',
            favorite: false
        })

        await taskRepository.create({
            id: '12149071-e525-42e9-b80e-65ad9c316141',
            title: 'test',
            content: 'content',
            color: '#FFFFFF',
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
