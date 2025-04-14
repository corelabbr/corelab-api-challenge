import { FastifyRequest, FastifyReply } from 'fastify';
import createItem from '../../services/create';
import { RequestBody } from 'commons/types';

export async function createHandler(
  request: FastifyRequest<{ Body: RequestBody }>,
  reply: FastifyReply,
) {
  const { name, description, favorite, color } = request.body;

  if (!name || !description) {
    return reply.status(400).send({ error: 'Nome e descrição são obrigatórios.' });
  }

  try {
    const item = await createItem({
      name,
      description,
      favorite: favorite ?? false,
      color: color ?? '89CFF0',
    });
    return reply.status(201).send(item);
  } catch (err) {
    console.error(`Error: ${err}`);
    return reply.status(500).send({ 
      error: 'Erro ao criar item',
      ...(err instanceof Error && { details: err.message }),
    });
  }
}