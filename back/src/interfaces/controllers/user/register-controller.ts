import { Request, Response } from "express";
import { CreateUseCase } from "@usecases/user/create-use-case";
import { AuthService } from "@infrastructure/jwt/auth-service";
import { hashPassword } from "@utils/password-generator";
import { UsuarioDTO } from "@domain/dtos/user/register-request-dto";

export class RegisterController {
    constructor(
        private readonly createUseCase: CreateUseCase,
        private readonly authService: AuthService
    ) {}

    async register(req: Request, res: Response): Promise<Response> {
        const dados: UsuarioDTO = req.body;

        if (!dados.nome || !dados.email || !dados.senha) {
            return res.status(400).json({ message: "Ops! Faltou preencher algum campo." });
        }

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email);

        if (!emailValido) {
            return res.status(400).json({
                message: "O e-mail parece estar em um formato inválido. Verifique e tente novamente.",
            });
        }

        if (dados.email && !emailValido) {
        return res.status(400).json({
            message: "O e-mail informado não é válido. Verifique e tente novamente.",
        });
        }

        if (dados.senha !== dados.confirmSenha) {
            return res.status(400).json({ message: "As senhas não são iguais. Dá uma conferida aí." });
        }

        const hashedPassword = await hashPassword(dados.senha);

        if (!hashedPassword) {
            return res.status(500).json({ message: "Ocorreu um problema ao proteger a sua senha. Tente novamente." });
        }
        
        try {
            const user = await this.createUseCase.execute({ nome: dados.nome, email: dados.email, passwordHash: hashedPassword });
            
            const token = this.authService.generateToken(user.id?.toString() || "");
 
            return res.status(201).json({
                message: "Usuário registrado com sucesso",
                user: { id: user.id, nome: user.nome, email: user.email },
                token: token
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}
