import { FastifyReply, FastifyRequest } from 'fastify';
import favoriteItem from '../../services/favorite';
import { FavoriteRequestBody, RequestParams } from 'commons/types';



export async function favoriteHandler(
  request: FastifyRequest<{ 
    Params: RequestParams
    Body: FavoriteRequestBody 
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const { favorite } = request.body;

  try {
    const updatedItem = await favoriteItem(id, favorite);
    return reply.status(200).send(updatedItem);
  } catch (err) {
    console.error(`Error: ${err}`);
    return reply.status(500).send({ 
      error: 'Erro ao atualizar favorito',
      ...(err instanceof Error && { details: err.message }),
    });
  }
}