import { FastifyReply, FastifyRequest } from 'fastify';
import findAll from '../../services/find-all';
import { FindAllQueryParams } from 'commons/types';



export async function findAllHandler(
  request: FastifyRequest<{
    Querystring: FindAllQueryParams
  }>,
  reply: FastifyReply,
) {
  try {
    const list = await findAll(request.query);
    return reply.status(200).send(list);
  } catch (err) {
    console.error(`Error: ${err}`);
    return reply.status(500).send({
      error: 'Erro ao listar itens',
      ...(err instanceof Error && { details: err.message }),
    });
  }
}