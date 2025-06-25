import SearchHeader from "./../components/SearchHeader";
import TaskCard from "./../components/TaskCard";
import TaskItemCard from "../components/TaskItemCard";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  function formatarDataBr(dataIso?: string): string {
    if (!dataIso) return "Sem data";
    const data = new Date(dataIso);
    return data.toLocaleString("pt-BR", {
      timeZone: "America/Campo_Grande",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  interface Task {
    id: number;
    titulo: string;
    descricao?: string;
    status: boolean;
    cor?: string;
    prioridade?: "ALTA" | "MEDIA" | "BAIXA";
    dataPrevista?: string;
  }

  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");

  async function fetchPutTaskStatus(id: number, status: boolean) {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3002/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erro no servidor:", errorText);
        throw new Error("Erro ao atualizar o status da tarefa");
      }

      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status } : task
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar o status da tarefa:", error);
    }
  }

  async function fetchTasks() {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar tarefas");

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [navigate]);

  const filteredTasks = tasks.filter((task) =>
    task.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <SearchHeader search={search} setSearch={setSearch} />

      <main className="pt-15 w-full flex flex-col items-center mx-auto">
        <div className="p-4 flex items-center justify-between w-full">
          <TaskCard onTaskCreated={fetchTasks} />
        </div>

        <div className="flex flex-wrap justify-center gap-4 w-full p-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500">Nenhuma tarefa cadastrada</p>
          ) : (
            filteredTasks
              .slice()
              .sort((a, b) => (b.status === true ? 1 : 0) - (a.status === true ? 1 : 0))
              .map((task) => (
                <TaskItemCard
                  key={task.id}
                  id={`${task.id}`}
                  title={task.titulo}
                  isFavorite={task.status}
                  color={task.cor || "bg-white"}
                  body={task.descricao}
                  onDelete={fetchTasks}
                  onStatusChange={(newStatus) => fetchPutTaskStatus(task.id, newStatus)}
                  priority={task.prioridade} 
                  date={formatarDataBr(task.dataPrevista) || "Sem data"}
                  onColorChange={(color) => {
                    setTasks(prev =>
                      prev.map(item =>
                        item.id === task.id ? { ...item, cor: color } : item
                      )
                    );
                  }}
                />
              ))
          )}
        </div>
      </main>
    </div>
  );
}
