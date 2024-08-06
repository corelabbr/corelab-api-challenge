import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const EditProfileRequestSchema = z.object({
  username: z.string().min(5).max(35).describe('Nome do usuário'),
  email: z.string().email().min(10).max(50).describe('E-mail do usuário'),
});

export class EditProfileRequestDTO extends createZodDto(
  EditProfileRequestSchema,
) {}

export const EditProfileResponseSchema = z.object({
  username: z.string().min(5).max(35).describe('Nome do usuário'),
  email: z.string().email().min(10).max(50).describe('E-mail do usuário'),
});

export class EditProfileResponseDTO extends createZodDto(
  EditProfileResponseSchema,
) {}
