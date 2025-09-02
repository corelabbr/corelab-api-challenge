import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const HealthCheckSchema = z.object({
  message: z.string().describe('Mensagem de verificação do HealthCheck'),
  status: z.string().describe('Status do HealthCheck'),
  timestamp: z.string().describe('Timestamp da verificação do HealthCheck'),
});

export class HealthCheckDto extends createZodDto(HealthCheckSchema) {}
