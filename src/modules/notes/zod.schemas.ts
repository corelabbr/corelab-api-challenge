import { z } from 'zod'

export const createNoteBodySchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  isFavorite: z.boolean(),
  fileUrl: z.string().optional(),
  color: z.string().optional(),
})

export const updateNoteBodySchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).max(255).optional(),
  isFavorite: z.boolean().optional(),
  fileUrl: z.string().optional(),
  color: z.string().optional(),
})
