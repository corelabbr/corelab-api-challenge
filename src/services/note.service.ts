import { pool } from '../db/client';
import { Note } from '../types/note';

export const getAll = async (): Promise<Note[]> => {
  const result = await pool.query(
    `SELECT id, title, description, favorite, created_at as "createdAt", updated_at as "updatedAt" 
     FROM notes 
     ORDER BY created_at DESC`
  );
  return result.rows;
};

export const create = async (note: Note): Promise<Note> => {
  const result = await pool.query(
    `INSERT INTO notes (title, description, favorite) 
     VALUES ($1, $2, $3) 
     RETURNING id, title, description, favorite, created_at as "createdAt", updated_at as "updatedAt"`,
    [note.title, note.description, note.favorite]
  );
  return result.rows[0];
};

export const update = async (id: string, note: Note): Promise<Note> => {
  const result = await pool.query(
    `UPDATE notes 
     SET title = $1, description = $2, favorite = $3, updated_at = now() 
     WHERE id = $4 
     RETURNING id, title, description, favorite, created_at as "createdAt", updated_at as "updatedAt"`,
    [note.title, note.description, note.favorite, id]
  );
  return result.rows[0];
};

export const remove = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM notes WHERE id = $1', [id]);
};

export const toggleFavorite = async (id: string): Promise<Note> => {
  const result = await pool.query(
    `UPDATE notes 
     SET favorite = NOT favorite, updated_at = now() 
     WHERE id = $1 
     RETURNING id, title, description, favorite, created_at as "createdAt", updated_at as "updatedAt"`,
    [id]
  );
  return result.rows[0];
};


export const toggleColor = async (id: string, color: string): Promise<Note> => {
  const result = await pool.query(
    `UPDATE notes 
     SET color = $1, updated_at = now() 
     WHERE id = $2 
     RETURNING id, title, description, favorite, color, created_at as "createdAt", updated_at as "updatedAt"`,
    [color, id]
  );
  return result.rows[0];
};

