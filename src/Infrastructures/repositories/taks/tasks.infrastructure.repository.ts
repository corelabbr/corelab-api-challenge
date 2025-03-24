import { Database } from "../../../db/database";
import { TaskEntity } from "../../../domains/entities/task.entity";

export default class TasksInfrastructureRepository {
    private constructor(private readonly banco: Database) { }

    public static create(banco: Database): TasksInfrastructureRepository {
        return new TasksInfrastructureRepository(banco);
    }

    async getTasks() {
        let sql = `SELECT * FROM tasks ORDER BY is_favorite DESC`;
        return await this.banco.ExecutaComando(sql);
    }

    async getTaskById(id: string) {
        let sql = `SELECT * FROM tasks WHERE id = ?`;
        const result = await this.banco.ExecutaComando(sql, [id]);
        return result[0];
    }

    async createTask(task: TaskEntity) {
        let sql = `INSERT INTO tasks (id, title, is_favorite, color) VALUES (?, ?, ?, ?)`;
        return await this.banco.ExecutaComando(sql, [task.id, task.title, task.is_favorite, task.color]);
    }

    async updateTask(task: TaskEntity) {
        let sql = `UPDATE tasks SET title = ?, is_favorite = ?, color = ? WHERE id = ?`;
        return await this.banco.ExecutaComando(sql, [task.title, task.is_favorite, task.color, task.id]);
    }

    async deleteTask(id: string) {
        let sql = `DELETE FROM tasks WHERE id = ?`;
        return await this.banco.ExecutaComando(sql, [id]);
    }

    async getTasksFavorite() {
        let sql = `SELECT * FROM tasks WHERE is_favorite = 1`;
        return await this.banco.ExecutaComando(sql);
    }
}
