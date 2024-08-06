import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const LoginUserBodySchema = z.object({
  username: z.string().min(5).max(35).describe('E-mail do usuário'),
  inserted_password: z.string().min(8).max(250).describe('Senha do usuário'),
});

export class LoginUserBodyDTO extends createZodDto(LoginUserBodySchema) {}

export const LoginUserResponseSchema = z.object({
  user: z.object({
    id: z.number().int().positive().describe('ID do usuário'),
    name: z.string().min(5).max(50).describe('Nome do usuário'),
    role: z.string().min(9).max(9).describe('Tipo de usuário'),
  }),
  token: z
    .string()
    .min(10)
    .max(255)
    .describe('Token de autenticação do usuário'),
});

export class LoginUserResponseDTO extends createZodDto(
  LoginUserResponseSchema,
) {}
