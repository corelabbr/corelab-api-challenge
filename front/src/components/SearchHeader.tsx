import { X, Filter, LucideNotebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FilterCard from "./FilterCard";
import { useState } from "react";

type Prioridade = "ALTA" | "MEDIA" | "BAIXA";

type SearchHeaderProps = {
  search: string;
  setSearch: (value: string) => void;
  filterColor?: string;
  setFilterColor: (value: string | undefined) => void;
  filterPriority?: Prioridade | undefined;
  filterDate?: string | undefined;
  setFilterPriority: (value: Prioridade | undefined) => void;
  setFilterDate: (value: string | undefined) => void;
};

export default function SearchHeader({
  search,
  setSearch,
  filterColor,
  setFilterColor,
  filterPriority,
  setFilterPriority,
  filterDate,
  setFilterDate,
}: SearchHeaderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  async function handleSearch(event: React.FormEvent | any) {
    event.preventDefault?.();
  }

  async function handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleSearch(event);
    }
  }

  function sair() {
    sessionStorage.removeItem("token");
    setTimeout(() => navigate("/login", { replace: true }), 250);
    console.log("Saindo da sessão");
  }

  const clearSearch = () => {
    setSearch("");
    setFilterColor(undefined);
    setFilterPriority(undefined);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow flex items-center justify-between px-2 py-4">
      <div className="flex items-center gap-2 ml-5 text-gray-700">
        <LucideNotebook size={24} className="text-blue-500" />
        <span className="font-semibold">CoreNotes</span>
      </div>

      <div className="flex flex-1 ml-10 mr-10 md:mr-96 relative">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          aria-label="Abrir filtros"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
        >
          <Filter size={20} />
        </button>

        <input
          type="text"
          placeholder="Pesquisar notas"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-1 border-2 border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      <div className="flex justify-end gap-4">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={clearSearch}
          aria-label="Limpar busca"
          disabled={!search && !filterColor && !filterPriority}
        >
          <X size={20} />
        </button>

        <button
          className="text-gray-500 hover:text-gray-700 mr-4"
          onClick={sair}
        >
          sair
        </button>
      </div>

      {isModalOpen && (
        <FilterCard
          selectedColor={filterColor}
          selectedPriority={filterPriority}
          selectedDate={filterDate}
          onColorChange={setFilterColor}
          onPriorityChange={setFilterPriority}
          onDateChange={setFilterDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </header>
  );
}
