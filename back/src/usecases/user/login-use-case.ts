import bcrypt from "bcrypt";
import { IUserRepository } from "@domain/repositories/user-repository";
import { AuthService } from "@infrastructure/jwt/auth-service";
import { LoginResponseDTO } from "@domain/dtos/user/login-response-dto";

export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private readonly authService: AuthService = new AuthService()
    ) {}

    async execute(email: string, password: string): Promise<LoginResponseDTO | null> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new Error("Ops! Esse usuário não existe em nosso sistema.");
        }

        const passwordMatches = await bcrypt.compare(password, user.passwordHash);

        if (!passwordMatches) {
            throw new Error("A senha que você digitou está incorreta.");
        }

        if (!user.id) {
            throw new Error("Essa conta existe, mas está desativada no sistema.");
        }
        
        const token = this.authService.generateToken(user.id.toString());

        return {
            id: user.id?.toString() || "",
            nome: user.nome,
            email: user.email,
            token
        };
    }
}