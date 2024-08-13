import { string, z } from 'zod';

export const createTaskSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3)
      .trim()
      .refine((value) => !/\s{2,}/.test(value), {
        message: 'O titulo não pode conter espaços consecutivos',
      }),

    taskContent: z
      .string()
      .min(3)
      .trim()
      .refine((value) => !/\s{2,}/.test(value), {
        message: 'O titulo não pode conter espaços consecutivos',
      }),
  }),
});

export const updateTaskSchema = createTaskSchema.partial()
