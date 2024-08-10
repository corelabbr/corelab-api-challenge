import { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';

type FastifyErrorHandler = FastifyInstance['errorHandler'];

export const errorHandler: FastifyErrorHandler = (error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Erro durante as validações',
      errors: error.flatten().fieldErrors,
    });
  }

  return reply.status(500).send({ message: 'Internal server error!' });
};
