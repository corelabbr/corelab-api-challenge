import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { ITask, ICreateTaskDTO, IUpdateTaskDTO } from 'App/Types/Task'

const dbPromise: Promise<Database> = open({
  filename: './database/database.sqlite',
  driver: sqlite3.Database,
})

async function ensureTasksTable() {
  const db = await dbPromise
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      is_favorite INTEGER DEFAULT 0,
      color TEXT DEFAULT '#ffffff',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `)
}
ensureTasksTable()

export default class Task {
  static async all(): Promise<ITask[]> {
    const db = await dbPromise
    const tasks = await db.all('SELECT * FROM tasks ORDER BY is_favorite DESC, created_at DESC')
    return tasks.map(Task.toITask)
  }

  static async find(id: number): Promise<ITask | null> {
    const db = await dbPromise
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', id)
    return task ? Task.toITask(task) : null
  }

  static async create(data: ICreateTaskDTO): Promise<ITask> {
    const db = await dbPromise
    const now = new Date().toISOString()
    const result = await db.run(
      `INSERT INTO tasks (title, description, is_favorite, color, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      data.title,
      data.description || '',
      data.isFavorite ? 1 : 0,
      data.color || '#ffffff',
      now,
      now
    )
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', result.lastID)
    return Task.toITask(task)
  }

  static async update(id: number, data: IUpdateTaskDTO): Promise<ITask | null> {
    const db = await dbPromise
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', id)
    if (!task) return null

    const now = new Date().toISOString()
    const fields: string[] = []
    const values: any[] = []

    if (data.title !== undefined) {
      fields.push('title = ?')
      values.push(data.title)
    }
    if (data.description !== undefined) {
      fields.push('description = ?')
      values.push(data.description)
    }
    if (data.isFavorite !== undefined) {
      fields.push('is_favorite = ?')
      values.push(data.isFavorite ? 1 : 0)
    }
    if (data.color !== undefined) {
      fields.push('color = ?')
      values.push(data.color)
    }
    fields.push('updated_at = ?')
    values.push(now)
    values.push(id)

    await db.run(`UPDATE tasks SET ${fields.join(', ')} WHERE id = ?`, ...values)
    const updatedTask = await db.get('SELECT * FROM tasks WHERE id = ?', id)
    return updatedTask ? Task.toITask(updatedTask) : null
  }

  static async delete(id: number): Promise<boolean> {
    const db = await dbPromise
    const result = await db.run('DELETE FROM tasks WHERE id = ?', id)
    return result.changes > 0
  }

  private static toITask(row: any): ITask {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      isFavorite: !!row.is_favorite,
      color: row.color,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }
  }
}