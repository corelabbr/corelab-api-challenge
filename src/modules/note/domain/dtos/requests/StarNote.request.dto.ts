import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const StarNoteBodySchema = z.object({
  note_id: z.string(),
});

export class StarNoteRequestDto extends createZodDto(StarNoteBodySchema) {}
