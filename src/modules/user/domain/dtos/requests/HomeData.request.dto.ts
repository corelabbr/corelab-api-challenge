import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const HomeDataResponseSchema = z.object({
  user: z.object({
    id: z.string().describe('ID do usuário'),
    name: z.string().max(50).describe('Nome do usuário'),
  }),
});

export class HomeDataResponseDTO extends createZodDto(HomeDataResponseSchema) {}
