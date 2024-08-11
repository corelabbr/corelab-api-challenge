import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { SetFavoriteTaskServices } from '../setFavoriteTaskServices'
import { beforeEach, describe, expect, it } from 'vitest'
import { TaskDoesNotExistError } from '../errors/taskDoesNotExistError'

let taskRepository: MemoryTaskRepository
let sut: SetFavoriteTaskServices

describe('SetFavoriteTaskServices', () => {
    beforeEach(() => {
        taskRepository = new MemoryTaskRepository()
        sut = new SetFavoriteTaskServices(taskRepository)
    })

    it('Must favorite the Task', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#D9D9D9'
        })

        const { task } = await sut.execute({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            favorite: true
        })

        expect(task.id).toEqual('a9acb560-968c-4232-826e-d64fe0bdb552')
        expect(task.favorite).toEqual(true)
    })

    it('Must unfavorite the Task', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#D9D9D9'
        })

        await sut.execute({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            favorite: true
        })

        const { task } = await sut.execute({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            favorite: false
        })

        expect(task.id).toEqual('a9acb560-968c-4232-826e-d64fe0bdb552')
        expect(task.favorite).toEqual(false)
    })

    it('Must return an Error due to non-existent Task', async () => {
        await expect(() => 
            sut.execute({
                id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
                favorite: true
            })
        ).rejects.toBeInstanceOf(TaskDoesNotExistError)
    })
})
