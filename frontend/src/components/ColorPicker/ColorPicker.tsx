import React from 'react';
import styles from './ColorPicker.module.scss';

interface ColorPickerProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  availableColors?: string[];
}

const DEFAULT_COLORS = [
  '#4CAF50', 
  '#2196F3', 
  '#FFC107', 
  '#FF5722', 
  '#9C27B0', 
  '#F44336', 
  '#607D8B',
];

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onSelectColor,
  availableColors = DEFAULT_COLORS,
}) => {
  return (
    <div className={styles.colorPicker}>
      {availableColors.map((color) => (
        <button
          key={color}
          type="button"
          className={`${styles.colorOption} ${
            selectedColor === color ? styles.selected : ''
          }`}
          style={{ backgroundColor: color }}
          onClick={() => onSelectColor(color)}
          aria-label={`Selecionar cor ${color}`}
        />
      ))}
    </div>
  );
};

export default ColorPicker;