import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/common/prisma.service';

describe('TodosController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  const userId = 'user-123';
  const otherUserId = 'other-user';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    prisma = app.get(PrismaService);

    await prisma.todo.deleteMany();
  });

  afterAll(async () => {
    await prisma.todo.deleteMany();
    await app.close();
  });

  describe('User operations', () => {
    beforeEach(async () => {
      await prisma.todo.deleteMany();
      await prisma.todo.createMany({
        data: [
          { title: 'Todo 1', userId },
          { title: 'Todo 2', userId },
          { title: 'Todo 3', userId: otherUserId },
        ],
      });
    });

    it('POST /todos - should create a todo', async () => {
      const res = await request(app.getHttpServer())
        .post('/todos')
        .send({
          title: 'New Todo',
          description: 'Description',
          color: '#00FF00',
          isFavorite: true,
          userId,
        })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body).toMatchObject({
        title: 'New Todo',
        description: 'Description',
        color: '#00FF00',
        isFavorite: true,
        userId,
      });
    });

    it('PATCH /todos/:id - should update a todo', async () => {
      const todo = await prisma.todo.create({
        data: { title: 'Todo Update', userId },
      });

      const res = await request(app.getHttpServer())
        .patch(`/todos/${todo.id}`)
        .send({ title: 'Updated Todo', isFavorite: true })
        .expect(200);

      expect(res.body).toMatchObject({
        id: todo.id,
        title: 'Updated Todo',
        isFavorite: true,
      });
    });

    it('PATCH /todos/:id - should return 404 if todo does not exist', async () => {
      await request(app.getHttpServer())
        .patch(`/todos/nonexistent-id`)
        .send({ title: 'Does not exist' })
        .expect(404);
    });

    it('GET /todos/:userId - should return only user todos', async () => {
      const res = await request(app.getHttpServer())
        .get(`/todos/${userId}`)
        .expect(200);

      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
      res.body.forEach((t: any) => {
        expect(t.userId).toBe(userId);
      });
    });

    it('DELETE /todos/:id - should delete a specific todo', async () => {
      const todo = await prisma.todo.create({
        data: { title: 'Todo to delete', userId },
      });

      const res = await request(app.getHttpServer())
        .delete(`/todos/${todo.id}`)
        .expect(200);

      expect(res.body).toEqual({ success: true });

      const deletedTodo = await prisma.todo.findUnique({
        where: { id: todo.id },
      });
      expect(deletedTodo).toBeNull();
    });

    it('DELETE /todos/:id - should return 404 if todo does not exist', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/todos/nonexistent-id`)
        .expect(404);

      expect(res.body).toHaveProperty('message');
    });
  });
});
