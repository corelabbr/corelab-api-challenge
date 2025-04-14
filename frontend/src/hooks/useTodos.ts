import { useState, useCallback, useEffect } from 'react';
import { CreateTodo, Todo, UpdateTodo } from '../types/todo.d';
import { 
  createTodo, 
  getTodos, 
  updateTodo, 
  deleteTodo,
  favoriteTodo,
} from '../services/todoService';

const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = useCallback(async (filtro?: string) => {
    setLoading(true);
    try {
      const data = await getTodos(filtro);
      setTodos(data);
      setError(null);
      return data;
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (todo: CreateTodo) => {
    setLoading(true);
    try {
      const newTodo = await createTodo({
        ...todo,
      });
      setTodos(prev => [...prev, newTodo]);
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateTodoItem = async (id: string, updatedFields: UpdateTodo) => {
    setLoading(true);
    try {
      const updatedTodo = await updateTodo(id, updatedFields);
      setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeTodo = async (id: string) => {
    setLoading(true);
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      setError(null);
      return true;
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id: string) => {  
    setLoading(true);
    try {
      const todo = todos.find(t => t.id === id);

      if(todo){
        const updatedTodo = await favoriteTodo(todo.id, {favorite: !todo.favorite});
        setTodos(prev => prev.map(todo => (todo.id === id ? updatedTodo : todo)));
        setError(null);
        return true;
      }
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  
  
  };

  return {
    todos,
    loading,
    error,
    editingTodo,
    setEditingTodo,
    fetchTodos,
    addTodo,
    updateTodoItem,
    removeTodo,
    toggleFavorite,
  };
};

export default useTodos;