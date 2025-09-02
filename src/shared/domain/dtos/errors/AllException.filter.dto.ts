import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const AllExceptionFilterSchema = z
  .object({
    message: z.string().describe('Descrição do erro'),
    statusCode: z.number().describe('Código do erro'),
    timestamp: z.string().describe('Timestamp do erro'),
  })
  .required()
  .describe('Resposta de erro genérico');

export class AllExceptionsFilterDTO extends createZodDto(
  AllExceptionFilterSchema,
) {}
