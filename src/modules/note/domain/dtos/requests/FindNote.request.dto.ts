import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const FindNoteByIdResponseSchema = z.object({
  id_note: z.string().min(1).uuid().describe('ID da nota'),
  note_title: z.string().min(1).max(255).describe('Título da nota'),
  note_text: z.string().min(1).describe('Conteúdo da nota'),
  note_color: z.string().describe('Cor da nota'),
  starred: z.boolean().default(false).describe('Favoritada'),
  user_id: z.string().min(1).uuid().describe('ID do usuário'),
  created_at: z.date().describe('Data de criação'),
  updated_at: z.date().describe('Data de atualização'),
});

export class FindNoteByIdResponseDto extends createZodDto(
  FindNoteByIdResponseSchema,
) {}

export const BrowseNotesResponseSchema = z.array(FindNoteByIdResponseSchema);

export class BrowseNotesResponseDto extends createZodDto(
  BrowseNotesResponseSchema,
) {}
