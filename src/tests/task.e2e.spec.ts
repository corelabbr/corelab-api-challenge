import { describe, test, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app';

const uuidRegex =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe('Testando as rotas /tasks', () => {
  test('Deve adicionar uma nova task usando POST /tasks', async () => {
    await app.ready();

    const response = await request(app.server).post('/tasks').send({
      title: 'Task de Testes',
      content: 'Conteudo de testes',
      color: '#FFFFFF',
      isFavorite: true,
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('taskId');
    expect(uuidRegex.test(response.body.taskId)).toBe(true);

    await request(app.server).del(`/tasks/${response.body.taskId}`);
  });

  test('Deve retornar as tasks usando GET /tasks', async () => {
    await app.ready();
    const newTask = await request(app.server).post('/tasks').send({
      title: 'Task de Testes',
      content: 'Conteudo de testes',
      color: '#FFFFFF',
      isFavorite: true,
    });
    const id = newTask.body.taskId;

    const response = await request(app.server).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toBe('Task de Testes');
    expect(response.body[0].content).toBe('Conteudo de testes');
    expect(response.body[0].color).toBe('#FFFFFF');
    expect(response.body[0].isFavorite).toBe(true);

    await request(app.server).del(`/tasks/${id}`);
  });

  test('Deve atualizar a task usando PATCH /tasks/taskId', async () => {
    await app.ready();

    const newTask = await request(app.server).post('/tasks').send({
      title: 'Task de Testes',
      content: 'Conteudo de testes',
      color: '#FFFFFF',
      isFavorite: true,
    });

    const id = newTask.body.taskId;

    await request(app.server)
      .patch(`/tasks/${id}`)
      .send({
        title: 'Task de Testes 2',
        content: 'Conteudo novo',
        color: '#FFFFFF',
        isFavorite: false,
      })
      .expect(200);

    const response = await request(app.server).get('/tasks');
    expect(response.statusCode).toBe(200);
    expect(response.body[0].title).toBe('Task de Testes 2');
    expect(response.body[0].content).toBe('Conteudo novo');
    expect(response.body[0].color).toBe('#FFFFFF');
    expect(response.body[0].isFavorite).toBe(false);

    await request(app.server).del(`/tasks/${id}`);
  });

  test('Deve deletar uma task usando DELETE /tasks', async () => {
    await app.ready();
    const newTask = await request(app.server)
      .post('/tasks')
      .send({
        title: 'Task de Testes',
        content: 'Conteudo de testes',
        color: '#FFFFFF',
        isFavorite: true,
      })
      .expect(201);
    const id = newTask.body.taskId;

    await request(app.server).del(`/tasks/${id}`).expect(200);
  });
});
