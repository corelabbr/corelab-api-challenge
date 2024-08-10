import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUI from '@fastify/swagger-ui';
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';

import { createTask } from './routes/create-task';
import { getTasks } from './routes/get-tasks';
import { updateTask } from './routes/update-task';
import { deleteTask } from './routes/delete-task';

import { errorHandler } from './middlewares/error-handler';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: '*' });

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'Corelab API Challenge',
      description: 'Rotas para a API do desafio da Corelab',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUI, { routePrefix: '/docs' });

app.register(createTask);
app.register(getTasks);
app.register(updateTask);
app.register(deleteTask);

app.setErrorHandler(errorHandler);

export { app };
