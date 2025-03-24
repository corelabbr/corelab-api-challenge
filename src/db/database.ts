import { createPool, Pool } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

export class Database {
    private pool: Pool;

    constructor() {
        this.pool = createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }

    public async ensureTablesExist(): Promise<void> {
        const sql = `
            CREATE TABLE IF NOT EXISTS tasks (
                id VARCHAR(36) NOT NULL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                is_favorite BOOLEAN NOT NULL DEFAULT FALSE,
                color VARCHAR(50)
            );
        `;
        await this.ExecutaComando(sql);
    }

    public async ExecutaComando(sql: string, parametros: any[] = []): Promise<any> {
        try {
            const [rows] = await this.pool.promise().query(sql, parametros);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    public async ExecutaComandoNoQuery(sql: string, parametros: any[] = []): Promise<any> {
        try {
            const [result] = await this.pool.promise().query(sql, parametros);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async ExecutaComandoLastInserted(sql: string, parametros: any[] = []): Promise<any> {
        try {
            const [result] = await this.pool.promise().query(sql, parametros);
            return result; // Retorna o ID do último registro inserido
        } catch (error) {
            throw error;
        }
    }
}