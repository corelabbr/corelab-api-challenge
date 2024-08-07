import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const EditNoteRequestSchema = z.object({
    title: z.string().min(5).max(50).describe('Título da nota'),
    note_text: z.string().min(1).max(500).describe('Texto da nota'),
    color: z.string().min(7).max(7).default('none').describe('Cor da nota'),
});

export class EditNoteRequestDTO extends createZodDto(
    EditNoteRequestSchema,
) {}

export const EditNoteResponseSchema = z.object({
    id: z.number().int().positive().describe('ID da nota'),
    title: z.string().min(5).max(50).describe('Título da nota'),
    note_text: z.string().min(1).max(500).describe('Texto da nota'),
    user_id: z.number().int().positive().describe('ID do usuário a qual a nota pertence'),
    color: z.string().min(7).max(7).describe('Cor da nota'),
    created_at: z.date().nullable().describe('Data de criação da nota'),
    updated_at: z.date().nullable().describe('Data de atualização da nota'),
});

export class EditNoteResponseDTO extends createZodDto(
    EditNoteResponseSchema,
) {}