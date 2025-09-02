import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { patchNestJsSwagger } from 'nestjs-zod';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { sharedSwaggerConfig } from '../shared/config/swagger.config';
import { appConfigurations } from '../shared/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  patchNestJsSwagger();

  const sharedDocument = SwaggerModule.createDocument(app, sharedSwaggerConfig);

  SwaggerModule.setup('swagger', app, sharedDocument);

  await app.listen(appConfigurations.PORT);
}
bootstrap();
