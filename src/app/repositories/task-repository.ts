import { Task } from '../../models/task'

export interface TaskRepository {
  findById(id: string): Promise<Task | null>
  save(task: Task): Promise<Task>
  favorite(id: string): Promise<void>
  unfavorite(id: string): Promise<void>
  complete(id: string): Promise<void>
  uncomplete(id: string): Promise<void>
}
