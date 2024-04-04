'use strict'
const connection = require('../../config/connection');

class Task {
    static async all() {
        try {
            const database = await connection
            const [rows] = await database.execute('SELECT * FROM tasks');

            const tasks = rows.map(row => ({
                id: row.id,
                title: row.title,
                description: row.description,
                favorite: row.favorite,
                color: row.color,
                created_at: row.created_at,
                updated_at: row.updated_at
            }));

            return tasks;
        } catch (error) {
            console.error('Error ao buscar todas as tarefas:', error.message);
            throw error;
        }
    }
}

module.exports = Task;
