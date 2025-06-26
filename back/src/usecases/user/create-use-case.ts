import { User } from "@domain/entities/user";
import { IUserRepository } from "@domain/repositories/user-repository";

export class CreateUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User): Promise<User> {

        if (!user.email) {
            throw new Error('O campo e-mail é obrigatório.');
        }
        
        const existingByEmail = await this.userRepository.findByEmail(user.email);
        if (existingByEmail) {
            throw new Error('Ops! Esse e-mail já foi registrado por outro usuário.');
        }

        return await this.userRepository.create(user);
    }
}
