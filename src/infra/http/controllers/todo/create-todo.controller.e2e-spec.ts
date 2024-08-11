import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';

describe('Create todo (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('[POST] /todos', async () => {
    const httpServer = app.getHttpServer();

    const todo: Prisma.TodoCreateInput = {
      title: faker.word.words(),
      description: faker.word.words(),
    };

    const createdResponse = await request(httpServer).post('/todos').send(todo);

    expect(createdResponse.statusCode).toBe(201);
    expect(todo.title).toEqual(createdResponse.body.title);
  }, 25000);

  afterAll(async () => await app.close());
});
