import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const UserLoginRequestSchema = z.object({
  email: z.string().min(1).max(255).describe('Email do usuário'),
  password: z.string().min(1).max(255).describe('Senha do usuário'),
});

export class UserLoginRequestDTO extends createZodDto(UserLoginRequestSchema) {}

export const UserLoginResponseSchema = z.object({
  token: z.string().describe('Token de autenticação do usuário'),
  user: z
    .object({
      id_user: z.string().describe('ID do usuário autenticado'),
      name: z.string().describe('Nome do usuário autenticado'),
    })
    .describe('Dados do usuário autenticado'),
});

export class UserLoginResponseDTO extends createZodDto(
  UserLoginResponseSchema,
) {}
