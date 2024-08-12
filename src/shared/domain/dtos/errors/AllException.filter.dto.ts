import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const AllExceptionFilterSchema = z
  .object({
    message: z.string().describe('Descrição'),
    statusCode: z.number().describe('Código devolvido'),
    timestamp: z.string().describe('Timestamp'),
    path: z.string().describe('Caminho da requisição'),
  })
  .required()
  .describe('Resposta comum em caso de erros');

export class AllExceptionsFilterDTO extends createZodDto(
  AllExceptionFilterSchema,
) {}
