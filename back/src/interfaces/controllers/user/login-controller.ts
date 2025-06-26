import { Request, Response } from "express";
import { LoginUseCase } from "@usecases/user/login-use-case";

export class LoginController {
    constructor(
        private readonly loginUseCase: LoginUseCase
    ) {}
    
    async login(req: Request, res: Response): Promise<Response> {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ message: "Email and password are required" });
        }


        try {
            const result = await this.loginUseCase.execute(email, senha);
            

            if (!result) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            return res.status(200).json({
                message: "Login successful",
                user: {
                    id: result.id,
                    nome: result.nome,
                    email: result.email
                },
                token: result.token
            });
        } catch (error: any) {
            return res.status(500).json({ message: error.message });
        }
    }
}