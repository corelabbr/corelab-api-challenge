import { DocumentBuilder } from '@nestjs/swagger';

export const sharedSwaggerConfig = new DocumentBuilder()
  .setTitle('Wits')
  .setDescription(
    'Documentação dos endpoints da API do desafio técnico da Corelab.',
  )
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Insira um token JWT para autenticar a requisição.',
    },
    'user-token',
  )
  .build();
