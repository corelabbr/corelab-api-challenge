import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  isFavorite: z.boolean(),
  color: z.string(),
});

export async function getTasks(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tasks',
    {
      schema: {
        summary: 'Busca todas as tasks',
        tags: ['Tasks'],
        response: {
          200: z.array(taskSchema),
        },
      },
    },
    async (_request, reply) => {
      const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return reply.status(200).send(tasks);
    },
  );
}
