import { Task } from '@/entities/task'

export interface TaskRepository {
    create(data: Task): Promise<Task>
    editTask(id: string, title: string, content: string, color: string | 'white' | 'blue' | 'green' | 'yellow' | 'salmon' | 'red' | 'blue2' | 'pink' | 'lemon' | 'orange' | 'gray' | 'gray2' | 'brown'): Promise<Task>
    setFavorite(id: string, favorite: boolean): Promise<Task>
    getTasks(): Promise<Task[] | null>
    getFavoriteTasks(): Promise<Task[] | null>
    findTask(id: string): Promise<Task | null>
    deleteTask(id: string): Promise<object | null>
}
