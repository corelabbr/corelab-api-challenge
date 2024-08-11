import { MemoryTaskRepository } from '@/repositories/memory/memoryTaskRepository'
import { CreateTaskServices } from '../createTaskServices'
import { beforeEach, describe, expect, it } from 'vitest'

let taskRepository: MemoryTaskRepository
let sut: CreateTaskServices

describe('CreateTaskServices', () => {
    beforeEach(() => {
        taskRepository = new MemoryTaskRepository()
        sut = new CreateTaskServices(taskRepository)
    })

    it('Must create a new Task', async () => {
        const { task } = await sut.execute({
            title: 'test',
            content: 'content',
            color: '#D9D9D9'
        })

        expect(task.id).toEqual(expect.any(String))
    })
})
