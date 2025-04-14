import React, { useState, useRef, useEffect } from 'react';
import styles from './TodoItem.module.scss';
import { FaStar, FaTimes, FaEdit, FaPalette } from 'react-icons/fa';
import { Todo, UpdateTodo } from '../../types/todo.d';
import ColorPicker from '../ColorPicker/ColorPicker';

interface TodoItemProps {
  todo: Todo;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  updateTodoItem: (id: string, updatedFields: UpdateTodo) => Promise<boolean>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleFavorite,
  onDelete,
  onEdit,
  updateTodoItem,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(todo.color);
  const colorButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setCurrentColor(todo.color);
  }, [todo.color]);

  const handleColorChange = async (color: string) => {
    const colorWithHash = color.startsWith('#') ? color : `#${color}`;
    
    setCurrentColor(colorWithHash);

    const updatedTodo = {
      ...todo,
      color: colorWithHash
    };

    const { id, ...updateData } = updatedTodo;

    try {
      const success = await updateTodoItem(id, updateData as UpdateTodo);
      if (!success) {
        setCurrentColor(todo.color);
      } else {
        setShowColorPicker(false);
      }
    } catch (error) {
      setCurrentColor(todo.color);
      throw new Error(`Failed to fetch todos ${error}`);
    }
  };

  return (
    <div 
      className={styles.todoItem}
      style={{ 
        background: currentColor.startsWith('#') ? currentColor : `#${currentColor}`,
        color: currentColor !== '#ffffff' ? 'white' : 'black'
      }}
    >
      <div className={styles.content}>
        <div 
          className={styles.header}
          style={{
            borderBottom: currentColor !== '#ffffff' 
              ? '0.1em solid currentColor' 
              : '0.1em solid #ddd'
          }}
        >
          <h3 className={styles.title}>{todo.name}</h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(todo.id);
            }}
            className={`${styles.favoriteButton} ${todo.favorite ? styles.favorited : ''}`}
            aria-label={todo.favorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            <FaStar />
          </button>
        </div>
        
        {todo.description && (
          <p className={styles.description}>{todo.description}</p>
        )}

        <div className={styles.actions}>
          <div className={styles.leftButtons}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(todo);
              }} 
              className={styles.editButton}
            >
              <FaEdit />
            </button>
            <div className={styles.colorPickerContainer}>
              <button 
                ref={colorButtonRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowColorPicker(!showColorPicker);
                }} 
                className={styles.colorButton}
              >
                <FaPalette />
              </button>
              {showColorPicker && (
                <div className={styles.colorPickerWrapper}>
                  <ColorPicker 
                    selectedColor={currentColor} 
                    onSelectColor={handleColorChange} 
                  />
                </div>
              )}
            </div>
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo.id);
            }} 
            className={styles.deleteButton}
          >
            <FaTimes />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;