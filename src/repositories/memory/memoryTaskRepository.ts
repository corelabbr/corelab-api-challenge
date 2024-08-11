import { Task } from "@/entities/task";
import { randomUUID } from "crypto";

export class MemoryTaskRepository {
    public items: Task[] = []

    async create(data: Task): Promise<Task> {
        const task = {
            id: randomUUID(),
            title: data.title,
            content: data.content,
            color: data.color,
            favorite: data.favorite,
            created_at: data.created_at
        }

        this.items.push(task)

        return task
    }

    async editTask(id: string, title: string, content: string, color: string | '#FFFFFF' | '#BAE2FF' | '#B9FFDD' | '#FFE8AC' | '#FFCAB9' | '#F99494' | '#9DD6FF' | '#ECA1FF' | '#DAFF8B' | '#FFA285' | '#CDCDCD' | '#979797' | '#A99A7C'): Promise<Task> {
        const taskIndex = this.items.findIndex((Task) => Task.id === id)
        
        this.items[taskIndex].title = title,
        this.items[taskIndex].content = content
        this.items[taskIndex].color = color

        return this.items[taskIndex]
    }

    async setFavorite(id: string, favorite: boolean): Promise<Task> {
        const taskIndex = this.items.findIndex((Task) => Task.id === id)

        this.items[taskIndex].favorite = favorite

        return this.items[taskIndex]
    }

    async getTasks(): Promise<Task[] | null> {
        const tasks = this.items.filter((Task) => Task.favorite === false)

        return tasks
    }

    async getFavoriteTasks(): Promise<Task[] | null> {
        const tasks = this.items.filter((Task) => Task.favorite === true)

        return tasks
    }

    async findTask(id: string): Promise<Task | null> {
        const task = this.items.find((Task) => Task.id = id)

        if(!task) {
            return null
        }

        return task
    }

    async deleteTask(id: string): Promise<object | null> {
        const tasks = this.items
        const taskIndex = tasks.findIndex((Task) => Task.id === id)

        this.items.splice(taskIndex, 1)

        return tasks
    }
}
