import type { Request, Response } from 'express';
import Task, { type ITask } from '../models/Task.js';

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const { favorite, color } = req.query;
    
    let filter: any = {};
    
    if (favorite === 'true') {
      filter.isFavorite = true;
    }
    
    if (color) {
      filter.color = color;
    }
    
    const tasks = await Task.find(filter).sort({ isFavorite: -1, createdAt: -1 });
    
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar Tasks', error });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task não encontrado' });
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar Task', error });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, isFavorite, color } = req.body;
    
    if (!title) {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }
    
    const newTask = new Task({
      title,
      description,
      isFavorite: isFavorite || false,
      color: color || '#ffffff',
    });
    
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar Task', error });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, isFavorite, color } = req.body;
    
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, isFavorite, color },
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task não encontrado' });
    }
    
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar Task', error });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task não encontrado' });
    }
    
    res.json({ message: 'Task deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar Task', error });
  }
};
