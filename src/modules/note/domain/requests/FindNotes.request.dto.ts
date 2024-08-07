import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const FindNoteResponseSchema = z.object({
  id: z.number().int().positive().describe('ID do item'),
  title: z.string().max(50).describe('Título do item'),
    note_text: z.string().max(500).describe('Texto da nota'),
    color: z.string().max(50).describe('Cor da nota'),
    favorite: z.boolean().describe('Favoritado'),
    created_at: z.date().describe('Data de criação'),
    updated_at: z.date().describe('Data de atualização'),
});

export class FindNoteResponseDTO extends createZodDto(FindNoteResponseSchema) {}

export class FindNotesResponseDTO extends createZodDto(z.array(FindNoteResponseSchema)) {}