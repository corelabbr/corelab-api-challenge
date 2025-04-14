import axios from 'axios';
import { Todo, CreateTodo, UpdateTodo } from '../types/todo.d';
import toast from 'react-hot-toast';
import formatItem from '../common/functions';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoService = {
  async getTodos(filtros?:string): Promise<Todo[]> {
    try {
      const response = await api.get(`/todos${filtros?'?'+filtros : ''}`);
      return response.data;
    } catch (error) {
      toast.error('Erro ao buscar os items.');
      throw new Error(`Failed to fetch todos ${error}`);
    }
  },
  async createTodo(todoData: CreateTodo): Promise<Todo> {
    try {
      const response = await api.post('/todo', formatItem(todoData));
      toast.success('Item criado com sucesso!');
      return response.data;
    } catch (error) {
      toast.error('Erro ao criar o item.');
      throw new Error(`Failed to create todo ${error}`);
    }
  },
  async updateTodo(id: string, todoData: UpdateTodo): Promise<Todo> {
    try {
      const response = await api.patch(`/todos/${id}`, formatItem(todoData));
      toast.success('Item atualizado com sucesso!');
      return response.data;
    } catch (error) {
      toast.error('Erro ao atualizar o item.');
      throw new Error(`Failed to update todo ${error}`);
    }
  },
  async deleteTodo(id: string): Promise<void> {
    try {
      await api.delete(`/todos/${id}`);
      toast.success('Item apagado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar o item.');
      throw new Error(`Failed to delete todo ${error}`);
    }
  },
  async favoriteTodo(id: string, data: { favorite: boolean }): Promise<Todo> {
    try {
      const response = await api.patch(`/todos/${id}/favorite`, data);
      toast.success(`Item ${data.favorite? 'favoritado': 'desfavoritado'} com sucesso!`);
      return response.data;
    } catch (error) {
      toast.error('Erro ao favoritar o item.');
      throw new Error(`Failed to toggle favorite ${error}`);
    }
  }
};

export const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  favoriteTodo,
} = todoService;