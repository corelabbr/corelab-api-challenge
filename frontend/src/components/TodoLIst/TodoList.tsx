import React from 'react';
import styles from './TodoList.module.scss';
import TodoItem from '../TodoItem/TodoItem';
import { Todo } from '../../types/todo.d';
import useTodos from '../../hooks/useTodos';

interface TodoListProps {
  todos: Todo[];
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleFavorite,
  onDelete,
  onEdit
}) => {
  const favoriteTodos = todos.filter(todo => todo.favorite);
  const otherTodos = todos.filter(todo => !todo.favorite);

  const { updateTodoItem } = useTodos();

  return (
    <div className={styles.todoList}>
      {favoriteTodos.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Favoritos</h2>
          <div className={styles.itemsContainer}>
            {favoriteTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
                onEdit={onEdit}
                updateTodoItem={updateTodoItem}
              />
            ))}
          </div>
        </div>
      )}

      {otherTodos.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Outros</h2>
          <div className={styles.itemsContainer}>
            {otherTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
                onEdit={onEdit}
                updateTodoItem={updateTodoItem}
              />
            ))}
          </div>
        </div>
      )}

      {todos.length === 0 && (
        <div className={styles.emptyState}>
          <p>Nenhum item encontrado. Adicione um novo!</p>
        </div>
      )}
    </div>
  );
};

export default TodoList;