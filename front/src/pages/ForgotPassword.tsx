import { useState } from "react";
import InputField from "../components/InputField";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
    const [form, setForm] = useState({ email: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (form.email === "") {
            alert("Por favor, preencha o campo de e-mail.");
            return;
        }

        async function fetchForgotPassword() {
            try {
                const response = await fetch("http://localhost:3002/forgot-password", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email: form.email }),
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.message || "Erro ao recuperar senha");
                }

                const data = await response.json();
                alert(data.message || "Instruções enviadas para o seu e-mail.");
                navigate("/login", { replace: true });

            } catch (error) {
                console.error("Erro ao recuperar senha:", error);
                window.alert("Ocorreu um erro ao tentar recuperar a senha. Tente novamente mais tarde.");
            }
        }

        fetchForgotPassword();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md border border-gray-200">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-xl font-semibold text-gray-800 mb-1 text-center">Recuperar Senha</h1>
                    <p className="text-sm text-gray-500 mb-6 text-center">
                        Digite seu e-mail e enviaremos instruções para redefinir sua senha.
                    </p>
                    <div className="space-y-4">
                        <InputField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            Enviar
                        </button>
                    </div>
                </form>
                <p className="text-sm text-center mt-4 text-gray-600">
                    Lembrou a senha?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Voltar para o login
                    </Link>
                </p>
            </div>
        </div>
    );
}
