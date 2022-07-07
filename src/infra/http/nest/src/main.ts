import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: '*',
  });
  const PORT = process.env.PORT || 3000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT, () =>
    console.log(`listening on host ${HOST}:${PORT}`),
  );
}
bootstrap();
