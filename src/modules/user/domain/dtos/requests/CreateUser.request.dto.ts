import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateUserBodySchema = z.object({
  name: z.string().min(1).max(255).describe('Nome do usuário'),
  email: z.string().min(1).max(255).describe('Email do usuário'),
  password: z.string().min(1).max(255).describe('Senha do usuário'),
  password_confirmation: z
    .string()
    .min(1)
    .max(255)
    .optional()
    .describe('Confirmação de senha do usuário'),
});

export class CreateUserBodyDTO extends createZodDto(CreateUserBodySchema) {}

export const CreateUserResponseSchema = z.object({
  token: z.string().describe('Token de autenticação do usuário'),
  id: z.string().describe('ID do usuário criado'),
});

export class CreateUserResponseDTO extends createZodDto(
  CreateUserResponseSchema,
) {}
