import './env_validate';
import Fastify from 'fastify';
import 'dotenv/config';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { todoRoutes } from './routes/todo-list';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

(async () => {
  const app = Fastify({ 
    logger: true,
  }).withTypeProvider<TypeBoxTypeProvider>();

  const app_port: number = Number(process.env.API_PORT) || 3000;

  await app.register(swagger, {
    openapi: {
      info: {
        title: 'API To-Do List',
        description: 'Documentação da API do CoreNotes',
        version: '1.0.0',
      },
      tags: [
        { name: 'todos', description: 'Endpoints' },
      ],
      servers: [
        { 
          url: `http://localhost:${app_port}`, 
          description: 'Servidor local', 
        },
      ],
    },
  });

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
    },
  });

  await app.register(cors, {
    origin: '*',
    methods: ['*'],
  });

  app.register(todoRoutes);

  app.get('/health', { schema: { hide: true } }, () => ({ status: 'OK' }));

  app.listen({ port: app_port, host: '0.0.0.0' }, (err) => {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }

    app.log.info(`Server running in ${process.env.ENV} mode on port ${app_port}`);
    app.log.info(`Documentation in http://localhost:${app_port}/docs`);
  });
})();