import { TaskDTO, Task } from '../models/task'
import { TaskRepository } from '../app/repositories/task-repository'

// this is a fake repository, it's not connected to any database
// it's just for testing purposes
// mocking the database in memory concept by Martin Fowler
// https://martinfowler.com/bliki/InMemoryTestDatabase.html

class TaskRepositoryInMemory implements TaskRepository {
  public tasks: Task[] = []

  public async findById(id: string): Promise<Task | null> {
    const task = this.tasks.find((task) => task.id === id)
    if (!task) return null
    return task
  }

  public async save(task: TaskDTO): Promise<Task> {
    const newTask = Task.create({
      id: (this.tasks.length + 1).toString(),
      title: task.title,
      body: task.body,
      color: task.color,
      completed: task.completed ?? false,
      favorited: task.favorited,
    })
    this.tasks.push(newTask)
    return newTask
  }

  public async complete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    this.tasks[taskIndex].completed = true
  }

  public async uncomplete(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    this.tasks[taskIndex].completed = false
  }

  public async favorite(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    this.tasks[taskIndex].favorited = true
  }

  public async unfavorite(id: string): Promise<void> {
    const taskIndex = this.tasks.findIndex((task) => task.id === id)
    this.tasks[taskIndex].favorited = false
  }
}

export default TaskRepositoryInMemory
