import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateNoteBodySchema = z.object({
  note_title: z.string().min(1).max(255).describe('Note`s title'),
  note_text: z.string().min(1).describe('Note`s content'),
  note_color: z
    .enum(['red', 'green', 'blue', 'yellow'])
    .describe('Note`s color'),
  starred: z.boolean().default(false).describe('Is it starred?'),
});

export class CreateNoteBodyDTO extends createZodDto(CreateNoteBodySchema) {}

export const CreateNoteResponseSchema = z.object({
  id_note: z.string().uuid().describe('Note`s ID'),
  ...CreateNoteBodySchema.shape,
  user_id: z.string().uuid().describe('User`s ID'),
  created_at: z.date().describe('Creation date'),
  updated_at: z.date().describe('Update date'),
});

export class CreateNoteResponseDTO extends createZodDto(
  CreateNoteResponseSchema,
) {}
