import { useState, useEffect } from "react";
import { X, Pencil, Droplet, Star, StarOff, Flag, Calendar } from "lucide-react";
import ColorPickerModal from "../components/ColorPickerModal";
import { useNavigate } from "react-router-dom";

type TaskItemCardProps = {
  id: string;
  title: string;
  isFavorite: boolean;
  color: string;
  body?: string;
  onDelete?: () => void;
  onStatusChange?: (newStatus: boolean) => void;
  priority?: "ALTA" | "MEDIA" | "BAIXA";
  date?: string;
  onColorChange?: (color: string) => void;
};

function formatDateToBR(dateStr: string): string {
  if (!dateStr) return "";

  if (dateStr.includes("/") && dateStr.includes(",")) {
    return dateStr.split(",")[0]; 
  }

  if (dateStr.includes("/")) {
    return dateStr;
  }

  const [year, month, day] = dateStr.split("-");
  if (!year || !month || !day) return "";

  return `${day}/${month}/${year}`;
}

const fetchDeleteTask = async (id: string, token: string) => {
  const numericId = Number(id);
  if (isNaN(numericId)) throw new Error("ID inválido");

  const response = await fetch(`http://localhost:3002/task/${numericId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Erro no servidor:", errorText);
    throw new Error("Erro ao excluir a tarefa");
  }
};

export default function TaskItemCard({
  id,
  title,
  isFavorite,
  color,
  body,
  onDelete,
  onStatusChange,
  priority,
  date,
  onColorChange
}: TaskItemCardProps) {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editBody, setEditBody] = useState(body || "");
  const [editPriority, setEditPriority] = useState<"ALTA" | "MEDIA" | "BAIXA">(priority ?? "BAIXA");
  const [editDate, setEditDate] = useState(date || "");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3002/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          titulo: editTitle,
          descricao: editBody,
          prioridade: editPriority,
          dataPrevista: editDate,
        }),
      });

      if (!response.ok) throw new Error("Erro ao atualizar a tarefa");

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const [starOn, setStarOn] = useState(isFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardColor, setCardColor] = useState(color);

  const handleDelete = async () => {
    if (!token) {
      console.error("Token não encontrado");
      return;
    }
    try {
      await fetchDeleteTask(id, token);
      onDelete?.();
    } catch (error) {
      console.error("Erro ao excluir a tarefa:", error);
    }
  };

  const handleToggleStar = () => {
    const newStatus = !starOn;
    setStarOn(newStatus);
    onStatusChange?.(newStatus);
  };

  return (
    <>
      <div
        id={`task-${id}`}
        className={`rounded-[2rem] shadow-md p-4 w-full max-w-sm ${cardColor} flex flex-col min-h-[300px]`}
      >
        <div className="flex-grow">
          <header
            className={`flex justify-between items-center mb-3 pb-1 border-b ${
              color ? "border-gray-400" : "border-gray-300"
            }`}
          >
            {isEditing ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="pl-5 flex-grow text-lg font-bold bg-white rounded px-2"
              />
            ) : (
              <p className="pl-5 flex-grow bg-transparent text-lg font-bold">
                {editTitle}
              </p>
            )}
            <button
              type="button"
              onClick={handleToggleStar}
              className="ml-2 text-yellow-500"
            >
              {starOn ? (
                <Star className="w-5 h-5 fill-yellow-500" />
              ) : (
                <StarOff className="w-5 h-5" />
              )}
            </button>
          </header>

          {isEditing ? (
            <textarea
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              className="w-full text-sm text-gray-600 p-1 pl-5 rounded bg-white resize-none"
              rows={5}
            />
          ) : (
            <p className="ml-5 text-sm text-gray-600 mb-4 whitespace-pre-wrap break-words">
              {editBody || "Nenhuma descrição fornecida."}
            </p>
          )}
        </div>

        {/* Footer fica sempre no fim por causa do mt-auto */}
        <footer className="flex justify-between items-center mt-auto text-sm">
          <div className="flex gap-3 items-center">
            <button title="Editar" onClick={() => setIsEditing(true)}>
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
            <button title="Cor" onClick={() => setIsModalOpen(true)}>
              <Droplet className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          <div className="flex flex-col items-end text-[11px] text-gray-500">
            <div className="flex gap-3">
              <span className="flex items-center gap-1">
                <Flag
                  className="w-5 h-5"
                  color={
                    priority === "ALTA"
                      ? "red"
                      : priority === "MEDIA"
                      ? "orange"
                      : "green"
                  }
                />
                {isEditing ? (
                  <select
                    value={editPriority}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        value === "ALTA" ||
                        value === "MEDIA" ||
                        value === "BAIXA"
                      ) {
                        setEditPriority(value);
                      }
                    }}
                    className="border rounded px-1 py-[2px]"
                  >
                    <option value="ALTA">ALTA</option>
                    <option value="MEDIA">MÉDIA</option>
                    <option value="BAIXA">BAIXA</option>
                  </select>
                ) : (
                  <span className="font-medium">{editPriority}</span>
                )}
              </span>

              <span className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                {isEditing ? (
                  <input
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className="border rounded px-1 py-[2px]"
                  />
                ) : (
                  <span>{formatDateToBR(editDate)}</span>
                )}
              </span>
            </div>
          </div>

          <button title="Excluir" onClick={handleDelete}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </footer>

        {isEditing && (
          <div className="mt-3 flex gap-2 justify-end">
            <button
              onClick={handleUpdate}
              className="text-sm text-white bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="text-sm text-gray-500 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ColorPickerModal
          onClose={() => setIsModalOpen(false)}
          onSelect={(color) => {
            setCardColor(color);
            onColorChange?.(color);
            setIsModalOpen(false);
          }}
          id={Number(id)}
        />
      )}
    </>
  );
}
