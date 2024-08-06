import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserRequestSchema = z.object({
  username: z.string().min(5).max(35).describe('Nome do usuário'),
  email: z.string().email().min(10).max(50).describe('E-mail do usuário'),
  password: z.string().min(8).max(50).describe('Senha do usuário'),
});

export class CreateUserRequestDTO extends createZodDto(
  CreateUserRequestSchema,
) {}

export const CreateUserResponseSchema = z.object({
  user: z.object({
    id: z.number().int().positive().describe('ID do usuário'),
    username: z.string().min(5).max(35).describe('Nome do usuário'),
    role: z.string().min(7).max(9).describe('Papel do usuário'),
  }),
  token: z.string().min(1).describe('Token de autenticação'),
});

export class CreateUserResponseDTO extends createZodDto(
  CreateUserResponseSchema,
) {}
