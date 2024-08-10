import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { prisma } from '../lib/prisma';

export async function deleteTask(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/tasks/:taskId',
    {
      schema: {
        summary: 'Exclui uma task existente',
        tags: ['Tasks'],
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

      await prisma.task.delete({ where: { id: taskId } });
      return reply
        .status(200)
        .send({ message: 'Tarefa excluída com sucesso!' });
    },
  );
}
