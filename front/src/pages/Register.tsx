import { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    fetchRegister();
  };

  async function fetchRegister() {
    try {
      const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: form.name,
          email: form.email,
          senha: form.password,
          confirmSenha: form.confirmPassword,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        window.alert(error.message || "Erro no cadastro");
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);

      setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      window.alert("Ocorreu um erro ao tentar fazer cadastro. Tente novamente mais tarde.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-1 text-center">Cadastro</h2>
          <p className="text-sm text-gray-500 mb-6 text-center">Crie sua conta para começar a usar</p>

          <div className="space-y-4">
            <InputField label="Nome" name="name" value={form.name} onChange={handleChange} />
            <InputField label="Email" name="email" value={form.email} onChange={handleChange} />
            <InputField label="Senha" name="password" type="password" value={form.password} onChange={handleChange} />
            <InputField label="Confirmar Senha" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Criar conta
            </button>
          </div>

          <p className="text-sm text-center mt-4 text-gray-600">
            Já tem conta?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
