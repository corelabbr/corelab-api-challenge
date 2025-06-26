import { User } from "@domain/entities/user";

export interface IUserRepository {   
    create(user: User): Promise<User>;
    findByName(name: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    findByResetToken(token: string): Promise<User | null>
}