import { TaskDTO } from '../../models/task'
import { TaskRepository } from '../repositories/task-repository'

class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async createTask({ title, body, favorited, color }: TaskDTO) {
    const task = await this.taskRepository.save({
      title,
      body,
      favorited,
      color,
    })

    return task
  }

  public async updateTask({ id, title, body, favorited, color }: TaskDTO) {
    const task = await this.taskRepository.update({
      id,
      title,
      body,
      favorited,
      color,
    })

    return task
  }

  public async deleteTask(id: string) {
    if (!id) throw new Error('Missing params')
    await this.taskRepository.delete(id)
  }

  public async getTaskById(id: string) {
    if (!id) throw new Error('Missing params')
    const task = await this.taskRepository.findById(id)
    if (!task) throw new Error('Task not found')
    return task
  }

  public async getAllTasks() {
    const tasks = await this.taskRepository.getAll()
    return tasks
  }
}

export default TaskUseCase
