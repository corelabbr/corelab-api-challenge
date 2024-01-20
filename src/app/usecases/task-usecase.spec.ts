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
  it('should update a task', async () => {
    const taskRepository = new TaskRepositoryInMemory()

    const task = {
      title: 'any_title',
      body: 'any_body',
      favorited: false,
      color: '#fff',
    }

    const sut = new TaskUseCase(taskRepository)
    const res = await sut.createTask(task)

    expect(res.title).toBe('any_title')
    expect(res.body).toBe('any_body')
    expect(res.favorited).toBe(false)
    expect(res.color).toBe('#fff')

    const updatedTask = {
      id: res.id,
      title: 'updated_title',
      body: 'updated_body',
      favorited: true,
      color: '#000',
    }

    const updatedRes = await sut.updateTask(updatedTask)

    expect(updatedRes.title).toBe('updated_title')
    expect(updatedRes.body).toBe('updated_body')
    expect(updatedRes.favorited).toBe(true)
    expect(updatedRes.color).toBe('#000')
  }),
    it('should delete a task', async () => {
      const taskRepository = new TaskRepositoryInMemory()

      const task = {
        title: 'any_title',
        body: 'any_body',
        favorited: false,
        color: '#fff',
      }
      const sut = new TaskUseCase(taskRepository)
      const res = await sut.createTask(task)

      expect(res.id).toBeTruthy()

      await sut.deleteTask(res.id!)
      const deletedTask = async () => await sut.getTaskById(res.id!)
      expect(deletedTask).rejects.toThrow('Task not found')
    })
})
