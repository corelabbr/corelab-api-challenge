import { DocumentBuilder } from '@nestjs/swagger';

export const sharedSwaggerConfig = new DocumentBuilder()
  .setTitle('CoreNotes API')
  .setDescription('API for a note-taking application.')
  .setVersion('1.0.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Insert a JWT token in order to authenticate.',
    },
    'access-token',
  )
  .build();
