import { Task } from '@/entities/task'

export interface ITask {
    create(data: Task): Promise<Task>
    editTask(id: string, title: string, content: string, color: string | '#FFFFFF' | '#BAE2FF' | '#B9FFDD' | '#FFE8AC' | '#FFCAB9' | '#F99494' | '#9DD6FF' | '#ECA1FF' | '#DAFF8B' | '#FFA285' | '#CDCDCD' | '#979797' | '#A99A7C'): Promise<Task>
    setFavorite(id: string, favorite: boolean): Promise<Task>
    getTasks(): Promise<Task[] | null>
    getFavoriteTasks(): Promise<Task[] | null>
    findTask(id: string): Promise<Task | null>
    deleteTask(id: string): Promise<object | null>
}
