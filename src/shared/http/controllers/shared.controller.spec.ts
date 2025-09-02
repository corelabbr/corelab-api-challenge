import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { SharedController } from './shared.controller';
import { INestApplication } from '@nestjs/common';
import { PrismaProvider } from '../../infra/providers/Prisma.provider';
import { SharedModule } from '../../infra/modules/Shared.module';
import { Environment } from '../../config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../../app/app.module';

describe('Shared Controller - /app', () => {
  let controllerRoute = '/app';
  let healthCheckRoute = `${controllerRoute}/health-check`;

  let controller: SharedController;

  let app: INestApplication;
  let prisma: PrismaProvider;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, SharedModule],
      providers: [PrismaProvider],
    })
      .overrideProvider(PrismaProvider)
      .useValue(new PrismaProvider(Environment.TEST))
      .compile();

    prisma = moduleRef.get(PrismaProvider);

    app = moduleRef.createNestApplication<NestExpressApplication>();
    app.useGlobalFilters();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await prisma.clear('all');
  });

  describe('GET /app/health-check', () => {
    it('should return a 300 status with a health check message', async () => {
      const response = await request(app.getHttpServer())
        .get(healthCheckRoute)
        .expect(300);

      expect(response.body).toEqual({
        status: 'API is working correctly!',
      });
    });
  });
});
