import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";

export default function RedefinirSenha() {
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const { token } = useParams();
  const navigate = useNavigate();

  const resetPassword = async (newPassword: string, token: string) => {
    try {
      await fetch("http://localhost:3002/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      setTimeout(() => {
          navigate("/login", { replace: true });
        }, 300);
    
    } catch (error) {
      alert("Erro ao redefinir senha. Tente novamente mais tarde.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { password, confirmPassword } = form;

    if (!password || !confirmPassword) {
      alert("Preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    if (!token) {
      alert("Token de redefinição inválido ou ausente.");
      return;
    }

    resetPassword(password, token);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-12">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-200">
        <form onSubmit={handleSubmit}>
          <h1 className="text-xl font-semibold text-gray-800 mb-1 text-center">Redefinir Senha</h1>
          <p className="text-sm text-gray-500 mb-6 text-center">
            Insira e confirme sua nova senha abaixo.
          </p>
          <div className="space-y-4">
            <div>
              <InputField
                type="password"
                label="Nova Senha"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputField
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                label="Confirmar Nova Senha"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Redefinir Senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
