import { useState } from "react";

type FilterCardProps = {
  selectedColor?: string;
  selectedPriority?: string;
  onColorChange: (color: string) => void;
  onPriorityChange: (priority: string) => void;
  onClose: () => void;
};

const colors = [
  "bg-red-200",
  "bg-green-200",
  "bg-blue-200",
  "bg-yellow-200",
  "bg-pink-200",
  "bg-purple-200",
  "bg-indigo-200",
  "bg-teal-200",
  "bg-orange-200",
  "bg-gray-200",
  "bg-gray-300",
  "bg-gray-400",
];
const priorities = ["ALTA", "MEDIA", "BAIXA"];

export default function FilterCard({
  selectedColor,
  selectedPriority,
  onColorChange,
  onPriorityChange,
  onClose,
}: FilterCardProps) {
  const [selectedDate] = useState(new Date().toISOString().split("T")[0]);
  
  return (
    <div className="fixed inset-0 z-50 bg-opacity-30 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Filtros</h3>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Cor:</p>
          <div className="flex gap-2 flex-wrap">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onColorChange(color)}
                className={`w-6 h-6 rounded-full ${selectedColor === color ? "ring-1 ring-black" : ""} ${color}`}
                style={{ backgroundColor: color }}
                aria-label={`Selecionar cor ${color}`}
              />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Prioridade:</p>
          <div className="flex flex-row gap-2">
            {priorities.map((priority) => (
              <label key={priority} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={selectedPriority === priority}
                  onChange={() => onPriorityChange(priority)}
                />
                {priority}
              </label>
            ))}
          </div>

          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Data:</p>
            <input
              type="date"
              value={selectedDate}
              className="border-1 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

        </div>

        <button
          onClick={onClose}
          disabled={!selectedColor && !selectedPriority}
          className={`mt-4 w-full py-1 text-sm text-white rounded-md transition ${
            !selectedColor && !selectedPriority
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          Aplicar filtros
      </button>
      </div>
    </div>
  );
}
