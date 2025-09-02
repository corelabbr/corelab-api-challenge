import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const ChangeNoteColorBodySchema = z.object({
  note_id: z.string(),
  note_color: z
    .enum(['red', 'green', 'blue', 'yellow'])
    .describe('Note`s color'),
});

export class ChangeNoteColorRequestDto extends createZodDto(
  ChangeNoteColorBodySchema,
) {}
