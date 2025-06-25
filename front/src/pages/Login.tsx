import { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.email === "" || form.senha === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    async function fetchLogin() {
      try {
        const response = await fetch("http://localhost:3002/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: form.email, senha: form.senha }),
        });

        if (!response.ok) {
          const error = await response.json();
          window.alert(error.message || "Erro no login");
          return;
        }

        const data = await response.json();
        sessionStorage.setItem("token", data.token);

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 300);

      } catch (error) {
        console.error("Erro ao fazer login:", error);
      }
    }

    fetchLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center">Entrar</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Acesse sua conta para continuar</p>
          
          <div className="space-y-4">
            <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
            <InputField label="Senha" name="senha" type="password" value={form.senha} onChange={handleChange} />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Entrar
            </button>
          </div>

          <p className="text-sm text-center mt-4 text-gray-600">
            Não tem conta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Cadastre-se
            </Link>
          </p>
          <p className="text-sm text-center mt-2 text-gray-600">
            Esqueceu a senha?{" "}
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Recuperar senha
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
