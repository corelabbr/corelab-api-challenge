import { FastifyRequest, FastifyReply } from 'fastify';
import update from '../../services/update';
import { RequestParams } from 'commons/types';


interface RequestBody {
  name?: string;
  description?: string;
  color?: string;
}

export async function updateHandler(
  request: FastifyRequest<{
    Params: RequestParams
    Body: RequestBody
  }>,
  reply: FastifyReply,
) {
  const { id } = request.params;
  const { name, description, color } = request.body;

  if (!name) {
    return reply.status(400).send({ 
      error: 'Pelo o nome deve ser atualizado', 
    });
  }

  try {
    const updated = await update(id, {
      ...(name && { name }),
      ...(description && { description }),
      ...(color && { color }),
    });
    
    return reply.status(200).send(updated);
  } catch (err) {
    console.error(`Error: ${err}`);
    return reply.status(500).send({ 
      error: 'Erro ao atualizar item',
      ...(err instanceof Error && { details: err.message }),
    });
  }
}