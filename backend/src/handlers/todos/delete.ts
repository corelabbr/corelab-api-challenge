import { FastifyReply, FastifyRequest } from 'fastify';
import deleteItem from '../../services/delete';

interface RequestParams {
  id: string;
}

export async function deleteHandler(
  request: FastifyRequest<{ Params: RequestParams }>,
  reply: FastifyReply
) {
  const { id } = request.params;

  try {
    await deleteItem(id);
    return reply.status(204).send();
  } catch (err) {
    console.error(err);
    return reply.status(500).send({
      error: 'Erro ao deletar item',
      ...(err instanceof Error && { details: err.message })
    });
  }
}