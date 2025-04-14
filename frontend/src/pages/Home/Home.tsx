import React, { useEffect } from 'react';
import useTodos from '../../hooks/useTodos';
import TodoList from '../../components/TodoLIst/TodoList';
import TodoForm from '../../components/TodoForm/TodoForm';
import styles from './Home.module.scss';
import { UpdateTodo } from '../../types/todo';
import Header from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const Home: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  const {
    todos,
    loading,
    error,
    editingTodo,
    setEditingTodo,
    addTodo,
    updateTodoItem,
    removeTodo,
    toggleFavorite,
    fetchTodos
  } = useTodos();

  useEffect(() => {
    const filter = searchTerm ? `search=${searchTerm}` : '';
    fetchTodos(filter);
  }, [searchTerm, fetchTodos]);




  return (
    <div className={styles.home}>
      <Header />
      <main className={styles.main}>
        <TodoForm onSubmit={addTodo} />

        {error && <div className={styles.error}>{error}</div>}

        {loading ? (
          <div className={styles.loadingContainer}>
            <BeatLoader 
              color="#15babc" 
              style={{ display: 'block', margin: '2rem auto' }}
              size={20}
            />
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggleFavorite={toggleFavorite}
            onDelete={removeTodo}
            onEdit={setEditingTodo}
          />
        )}

        {editingTodo && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <TodoForm
                onSubmit={(todo) => {
                  updateTodoItem(editingTodo.id, todo as UpdateTodo);
                  setEditingTodo(null);
                }}
                initialValues={editingTodo}
                onCancel={() => setEditingTodo(null)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;