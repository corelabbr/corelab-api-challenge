import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { patchNestJsSwagger } from 'nestjs-zod';
import { SwaggerModule } from '@nestjs/swagger';
import { sharedSwaggerConfig } from '../shared/config/swagger.config';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  const PORT = process.env.API_PORT;

  patchNestJsSwagger();

  const sharedDocument = SwaggerModule.createDocument(app, sharedSwaggerConfig);

  SwaggerModule.setup('swagger', app, sharedDocument);

  await app.listen(PORT);
}
bootstrap();
