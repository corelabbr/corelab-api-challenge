import { FastifyReply, FastifyRequest } from 'fastify';
import findById from '../../services/find-by-id';
import { RequestParams } from 'commons/types';

export async function findByIdHandler(
  request: FastifyRequest<{ 
    Params: RequestParams 
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;

  try {
    const item = await findById(id);
    
    if (!item) {
      return reply.status(404).send({
        error: 'Item não encontrado',
        itemId: id,
      });
    }

    return reply.status(200).send(item);
  } catch (err) {
    console.error(`Error: ${err}`);
    return reply.status(500).send({ 
      error: 'Erro ao buscar item',
      ...(err instanceof Error && { details: err.message }),
    });
  }
}