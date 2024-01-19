import { Task } from '../../models/task'
import TaskRepositoryInMemory from '../../tests/task-repository-in-memory'
import TaskUseCase from './task-usecase'

describe('Task Use Case', () => {
  it('should create a task', async () => {
    const taskRepository = new TaskRepositoryInMemory()

    const task = {
      title: 'any_title',
      body: 'any_body',
      completed: false,
      favorited: false,
      color: '#fff',
    }
    // sut = system under test
    const sut = new TaskUseCase(taskRepository)
    const res = await sut.createTask(task)
    expect(res).toBeInstanceOf(Task)
  }),
    it('should favorite a task', async () => {
      const taskRepository = new TaskRepositoryInMemory()

      const task = {
        title: 'any_title',
        body: 'any_body',
        favorited: false,
        color: '#fff',
      }
      const sut = new TaskUseCase(taskRepository)
      const res = await sut.createTask(task)

      expect(res.favorited).toBe(false)

      await sut.favoriteTask(res.id!)
      expect(res.favorited).toBe(true)
    }),
    it('should unfavorite a task', async () => {
      const taskRepository = new TaskRepositoryInMemory()

      const task = {
        title: 'any_title',
        body: 'any_body',
        favorited: true,
        color: '#fff',
      }
      const sut = new TaskUseCase(taskRepository)
      const res = await sut.createTask(task)

      expect(res.favorited).toBe(true)

      await sut.unfavoriteTask(res.id!)
      expect(res.favorited).toBe(false)
    }),
    it('should complete a task', async () => {
      const taskRepository = new TaskRepositoryInMemory()

      const task = {
        title: 'any_title',
        body: 'any_body',
        completed: false,
        favorited: false,
        color: '#fff',
      }
      const sut = new TaskUseCase(taskRepository)
      const res = await sut.createTask(task)

      expect(res.completed).toBe(false)

      await sut.completeTask(res.id!)
      expect(res.completed).toBe(true)
    }),
    it('should uncomplete a task', async () => {
      const taskRepository = new TaskRepositoryInMemory()

      const task = {
        title: 'any_title',
        body: 'any_body',
        completed: true,
        favorited: false,
        color: '#fff',
      }
      const sut = new TaskUseCase(taskRepository)
      const res = await sut.createTask(task)

      expect(res.completed).toBe(true)

      await sut.uncompleteTask(res.id!)
      expect(res.completed).toBe(false)
    })
})
