import React, { useState } from 'react';
import styles from './TodoForm.module.scss';
import ColorPicker from '../ColorPicker/ColorPicker';
import { Todo, CreateTodo } from '../../types/todo.d';
import { FaStar } from 'react-icons/fa';

interface TodoFormProps {
    onSubmit: (todo: CreateTodo) => void;
    initialValues?: Partial<Todo>;
    onCancel?: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, initialValues, onCancel }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [color, setColor] = useState(initialValues?.color || '#4CAF50');
  const [favorite, setFavorite] = useState(initialValues?.favorite || false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      color,
      favorite
    });
    
    if (!initialValues?.id) {
      setName('');
      setDescription('');
      setColor('#4CAF50');
      setFavorite(false);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorite(!favorite);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.todoForm}>
      <div className={styles.formGroup}>
        <div className={styles.header}>
          <label htmlFor="title">Título</label>
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={`${styles.favoriteButton} ${favorite ? styles.favorited : ''}`}
          >
            <FaStar />
          </button>
        </div>
        <input
          id="title"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Insira o título"
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description">Descrição</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Insira a descrição"
          rows={3}
        />
      </div>
      
      <div className={styles.formRow}>
        {!initialValues?.id && (
          <div className={styles.formGroup}>
            <ColorPicker selectedColor={color} onSelectColor={setColor} />
          </div>
        )} 
      </div>
      
      <div className={styles.formActions}>
        {onCancel && (
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancelar
          </button>
        )}
        <button type="submit" className={styles.submitButton}>
          {initialValues?.id ? 'Atualizar' : 'Criar'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;