import { Request, Response } from 'express';
import * as NoteService from '../services/note.service';

export const getAllNotes = async (_req: Request, res: Response) => {
  const notes = await NoteService.getAll();
  res.json(notes);
};

export const createNote = async (req: Request, res: Response) => {
  const note = await NoteService.create(req.body);
  res.status(201).json(note);
};

export const updateNote = async (req: Request, res: Response) => {
  const updated = await NoteService.update(req.params.id, req.body);
  res.json(updated);
};

export const deleteNote = async (req: Request, res: Response) => {
  await NoteService.remove(req.params.id);
  res.status(204).send();
};

export const toggleFavorite = async (req: Request, res: Response) => {
  const updated = await NoteService.toggleFavorite(req.params.id);
  res.json(updated);
};

export const toggleColor = async (req: Request, res: Response) => {
  const { color } = req.body;

  if (!color) {
    return res.status(400).json({ message: "Cor não fornecida." });
  }

  try {
    const updated = await NoteService.toggleColor(req.params.id, color);
    res.json(updated);
  } catch (error) {
    console.error("Erro ao trocar cor:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

