import { faker } from '@faker-js/faker';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { AppModule } from '../../../app.module';
import * as request from 'supertest';

describe('Update todo (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  test('[PATCH] /todos', async () => {
    const httpServer = app.getHttpServer();

    const todo: Prisma.TodoCreateInput = {
      title: faker.word.words(),
      description: faker.word.words(),
      color: '#fffff',
    };

    const createdResponse = await request(httpServer)
      .patch('/todos')
      .send(todo);

    const createdBody = createdResponse.body;

    const updateRequest = {
      id: createdBody.id,
      title: 'New title',
      description: 'New description',
    };

    await request(httpServer).patch('/todos').send(updateRequest);

    const foundResponse = await request(httpServer).get(
      `/todos/${createdBody.id}`,
    );

    expect(foundResponse.statusCode).toBe(200);
    expect(foundResponse.body.title).toEqual(updateRequest.title);
    expect(foundResponse.body.description).toEqual(updateRequest.description);
    expect(foundResponse.body.color).toBe('#fffff');
  }, 25000);

  afterAll(async () => await app.close());
});
