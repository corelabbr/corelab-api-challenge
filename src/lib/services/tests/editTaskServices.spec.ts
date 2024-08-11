import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { EditTaskServices } from '../editTaskServices'
import { beforeEach, describe, expect, it } from 'vitest'
import { MissingFieldsError } from '../errors/missingFieldsError'
import { TaskDoesNotExistError } from '../errors/taskDoesNotExistError'
import { InvalidColorError } from '../errors/invalidColorError'

let taskRepository: MemoryTaskRepository
let sut: EditTaskServices

describe('EditTaskServices', () => {
    beforeEach(() => {
        taskRepository = new MemoryTaskRepository()
        sut = new EditTaskServices(taskRepository)
    })

    it('Must edit the Task', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#FFFFFF'
        })

        const { task } = await sut.execute({
            id: "a9acb560-968c-4232-826e-d64fe0bdb552",
            title: 'edited title',
            content: 'edited content',
            color: '#BAE2FF'
        })

        expect(task.id).toEqual('a9acb560-968c-4232-826e-d64fe0bdb552')
        expect(task.title).toEqual('edited title')
        expect(task.content).toEqual('edited content')
        expect(task.color).toEqual('#BAE2FF')
    })

    it('Must return an Error due to Invalid Color', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#FFFFFF'
        })

        await expect(() => 
            sut.execute({
                id: "a9acb560-968c-4232-826e-d64fe0bdb552",
                title: 'edited title',
                content: 'edited content',
                color: 'invalid-color'
            })
        ).rejects.toBeInstanceOf(InvalidColorError)
    })

    it('Must return an Error due to missing or blank Fields', async () => {
        await taskRepository.create({
            id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
            title: 'test',
            content: 'content',
            color: '#FFFFFF'
        })

        await expect(() => 
            sut.execute({
                id: "a9acb560-968c-4232-826e-d64fe0bdb552",
                title: '',
                content: '',
                color: ''
            })
        ).rejects.toBeInstanceOf(MissingFieldsError)
    })

    it('Must return an Error due to non-existent Task', async () => {
        await expect(() => 
            sut.execute({
                id: 'a9acb560-968c-4232-826e-d64fe0bdb552',
                title: 'edited title',
                content: 'edited content',
                color: '#BAE2FF'
            })
        ).rejects.toBeInstanceOf(TaskDoesNotExistError)
    })
})
