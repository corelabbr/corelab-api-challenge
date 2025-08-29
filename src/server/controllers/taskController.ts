import { Request, Response } from 'express';
import { db } from '../database/connection';
import { Task } from '../models/task';
import { validationResult } from 'express-validator';
import { RowDataPacket } from 'mysql2';

export const listTasks = async (req: Request, res: Response) => {
    try {
        const { favorite, color } = req.query;

        let query = 'SELECT * FROM tasks';
        const conditions: string[] = [];
        const params: (string | boolean)[] = [];

        if (favorite !== undefined) {
            conditions.push('favorite = ?');
            params.push(favorite === 'true');
        }

        if (color) {
            conditions.push('color = ?');
            params.push(color as string);
        }

        if (conditions.length) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY favorite DESC, id DESC';

        const [rows] = await db.query(query, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao listar tarefas', error: err });
    }
};

export const getTask = async (req: Request, res: Response) => {
    const [rows] = await db.query<Task & RowDataPacket[]>(
        'SELECT * FROM tasks WHERE id = ?',
        [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json(rows[0]);
};

export const createTask = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, completed = false, favorite = false, color } = req.body as Task;

    try {
        const [result] = await db.query(
            'INSERT INTO tasks (title, description, completed, favorite, color) VALUES (?, ?, ?, ?, ?)',
            [title, description, completed, favorite, color]
        );
        res.status(201).json({ id: (result as any).insertId, title, description, completed, favorite, color });
    } catch (err) {
        res.status(500).json({ message: 'Erro ao criar tarefa', error: err });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = req.body as Partial<Task>;
    await db.query('UPDATE tasks SET ? WHERE id = ?', [data, id]);
    res.json({ message: 'Tarefa atualizada' });
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.status(204).send();
};

export const toggleFavorite = async (req: Request, res: Response) => {
    const { id } = req.params;
    await db.query('UPDATE tasks SET favorite = NOT favorite WHERE id = ?', [id]);
    res.json({ message: 'Favorito alternado' });
};
