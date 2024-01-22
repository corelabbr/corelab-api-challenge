import { Task } from '../../models/task'

export interface TaskRepository {
  findById(id: string): Promise<Task | null>
  save(task: Task): Promise<Task>
  update(task: Task): Promise<Task>
  delete(id: string): Promise<void>
  getAll(): Promise<Task[]>
}
