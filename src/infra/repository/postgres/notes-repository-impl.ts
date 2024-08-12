import Note from '../../../domain/entity/note';
import { NotesRepository } from '../../../domain/repository/notes-repository';
import User from '../../../domain/entity/user';
import { Connection } from '@/infra/database/connection';
import ApiError from '../../../domain/error/error';

export default class NotesRepositoryImpl implements NotesRepository {
  constructor(private readonly db: Connection) {}

  async create(note: Note): Promise<Note> {
    const text = "INSERT INTO notes (id, user_id, title, content, color, favorite, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
    const values = [note.getId(), note.getUser().getId(), note.getTitle(), note.getContent(), note.getColor(), note.getFavorite(), note.getCreatedAt(), note.getUpdatedAt()];
    try {
      await this.db.query(text, values);
      return note;
    } catch (error) {
      throw new ApiError(400, "Note not created");
    }
  }
  async get(noteId: string, userId: string): Promise<Note | undefined> {
    const query = "SELECT * FROM notes WHERE id = $1 AND user_id = $2";
    const result = await this.db.query(query, [noteId, userId]);
    if (result.length === 0) {
      return undefined;
    }
    const user = User.fromUser(result[0].user_id);
    const note = Note.fromNote(
      result[0].id,
      user,
      result[0].title,
      result[0].content,
      result[0].color,
      result[0].favorite,
      result[0].created_at,
      result[0].updated_at
    );
    return note;
  }
  async list(noteIds: string[], userId: string): Promise<Note[]> {
    let query;
    let values = []
    if (noteIds.length === 0) {
      query = "SELECT * FROM notes WHERE user_id = $1";
      values = [userId];
    } else {
      query = "SELECT * FROM notes WHERE user_id = $1 AND id = ANY($2)";
      values = [userId, noteIds];
    }
    try {
      const result = await this.db.query(query, values);
      const notes = result.map((row: any) => {
        const user = User.fromUser(row.user_id);
        return Note.fromNote(
          row.id,
          user,
          row.title,
          row.content,
          row.color,
          row.favorite,
          row.created_at,
          row.updated_at
        );
      });
      return notes
    } catch (error) {
      throw new ApiError(404, "Notes not found");
    }
  }
  async update(note: Note): Promise<Note> {
    const query = "UPDATE notes SET title = $1, content = $2, color = $3, favorite = $4, created_at = $5, updated_at = $6 WHERE id = $7 AND user_id = $8 RETURNING *";
    const values = [
      note.getTitle(), 
      note.getContent(), 
      note.getColor(), 
      note.getFavorite(), 
      note.getCreatedAt(), 
      note.getUpdatedAt(), 
      note.getId(), 
      note.getUser().getId()
    ];
    try {
      await this.db.query(query, values);
      return note;
    } catch (error) {
      throw new ApiError(400, "Note not updated");
    }
  }
  async delete(note: Note): Promise<void> {
    const query = "DELETE FROM notes WHERE id = $1 AND user_id = $2";
    const values = [note.getId(), note.getUser().getId()];
    await this.db.query(query, values);
  }
  async bulkDelete(noteIds: string[], userId: string): Promise<void> {
    const query = "DELETE FROM notes WHERE id = ANY($1) AND user_id = $2";
    const values = [noteIds, userId];
    await this.db.query(query, values);
  }
  async searchNotes(keywords: string, userId: string): Promise<Note[]> {
    const query = "SELECT * FROM notes WHERE user_id = $1 AND (title ILIKE $2 OR content ILIKE $2)";
    const values = [userId, `%${keywords}%`];
    try {
      const result = await this.db.query(query, values);
      const notes = result.map((row: any) => {
        const user = User.fromUser(row.user_id);
        return Note.fromNote(
          row.id,
          user,
          row.title,
          row.content,
          row.color,
          row.favorite,
          row.created_at,
          row.updated_at
        );
      });
      return notes;
    } catch (error) {
      throw new ApiError(404, "Notes not found");
      throw new Error("Notes not found");
    }
  }
}