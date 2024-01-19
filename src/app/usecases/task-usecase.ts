import { TaskDTO } from '../../models/task'
import { TaskRepository } from '../repositories/task-repository'

class TaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  public async createTask({ title, body, favorited, completed, color }: TaskDTO) {
    const task = await this.taskRepository.save({
      title,
      body,
      favorited,
      completed,
      color,
    })

    return task
  }

  public async completeTask(id: string) {
    if (!id) throw new Error('Missing params')
    await this.taskRepository.complete(id)
  }

  public async uncompleteTask(id: string) {
    if (!id) throw new Error('Missing params')
    await this.taskRepository.uncomplete(id)
  }

  public async favoriteTask(id: string) {
    if (!id) throw new Error('Missing params')
    await this.taskRepository.favorite(id)
  }

  public async unfavoriteTask(id: string) {
    if (!id) throw new Error('Missing params')
    await this.taskRepository.unfavorite(id)
  }
}

export default TaskUseCase
