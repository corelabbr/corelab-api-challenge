import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const FindUserResponseSchema = z.object({
  id: z.number().int().positive().describe('ID do usuário'),
  username: z.string().max(50).describe('Nome do usuário'),
  courses_completed: z.number().int().positive().describe('Cursos completados'),
  score: z.number().int().positive().describe('Pontuação do usuário'),
  member_since: z.string().max(50).describe('Membro desde'),
});

export class FindUserResponseDTO extends createZodDto(FindUserResponseSchema) {}
