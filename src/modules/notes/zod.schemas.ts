import { Types } from 'mongoose'
import { z } from 'zod'

export const createNoteBodySchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1).max(255),
  isFavorite: z.boolean(),
  fileUrl: z.union([z.string(), z.null()]).default(null),
  color: z.union([z.string(), z.null()]).default(null),
})

export const updateNoteBodySchema = createNoteBodySchema.partial()

export const noteIdParamSchema = z.string().refine((value) => {
  return Types.ObjectId.isValid(value)
})
