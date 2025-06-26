import { PrismaClient } from "@prisma/client";
import { User } from "@domain/entities/user";
import { IUserRepository } from "@domain/repositories/user-repository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements IUserRepository {

    async create(user: User): Promise<User> {
        const newUser = await prisma.usuario.create({
            data: {
                nome: user.nome,
                email: user.email,
                passwordHash: user.passwordHash,
            },
        });
        return new User( 
            newUser.nome,
            newUser.email,
            newUser.passwordHash,
            newUser.id,
            newUser.createdAt
        );
    }

    async findByName(name: string): Promise<User | null> {
        const user = await prisma.usuario.findFirst({
            where: {
                nome: name
            },
        });
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.usuario.findFirst({
            where: { email },
        });

        if (!user) return null;

        return new User(
            user.nome,
            user.email,
            user.passwordHash,
            user.id,
            user.createdAt
        );
    }

    async save(user: User): Promise<User> {
        const updatedUser = await prisma.usuario.update({
            where: { id: user.id },
            data: {
                nome: user.nome,
                email: user.email,
                passwordHash: user.passwordHash,
                resetToken: user.resetToken,
                tokenExpires: user.tokenExpires,
            },
        });
        return new User(
            updatedUser.nome,
            updatedUser.email,
            updatedUser.passwordHash,
            updatedUser.id,
            updatedUser.createdAt,
            updatedUser.resetToken,
            updatedUser.tokenExpires
        );
    }

    async findByResetToken(token: string): Promise<User | null> {
        const user = await prisma.usuario.findFirst({
            where: {
                resetToken: token ,
                tokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) return null;

        return new User(
            user.nome,
            user.email,
            user.passwordHash,
            user.id,
            user.createdAt,
            user.resetToken,
            user.tokenExpires
        );
    }
}
