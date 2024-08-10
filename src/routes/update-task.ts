import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function updateTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/tasks/:taskId',
    {
      schema: {
        summary: 'Atualiza uma task existente',
        tags: ['Tasks'],
        body: z.object({
          title: z.string().min(3),
          content: z.string().min(3),
          isFavorite: z.boolean(),
          color: z.string(),
        }),
        params: z.object({
          taskId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { taskId } = request.params;
      const { title, content, isFavorite, color } = request.body;

      await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          title,
          content,
          color,
          isFavorite,
        },
      });
      return reply
        .status(200)
        .send({ message: 'Tarefa atualizada com sucesso!' });
    },
  );
}
