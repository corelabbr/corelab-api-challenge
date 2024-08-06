import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const GetUserProfileResponseSchema = z.object({
  username: z.string().max(50).describe('Nome do usuário'),
  email: z.string().max(50).describe('Email do usuário'),
  user_score: z.number().int().positive().describe('Pontuação do usuário'),
  courses_completed: z.number().int().positive().describe('Cursos completados'),
  member_since: z.string().max(50).describe('Membro desde'),
});

export class GetUserProfileResponseResponseDTO extends createZodDto(
  GetUserProfileResponseSchema,
) {}
