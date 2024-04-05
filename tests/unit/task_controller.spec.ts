import { test } from '@japa/runner'
const baseUrl = "http://localhost:3333";
const Task = require('App/Models/Task')

test.group('unit tests', () => {
  test('welcome', async ({ client }) => {
    const response = await client.get(`${baseUrl}`)
    response.assertStatus(200)
  })

  test('get all tasks', async ({ client }) => {
    const response = await client.get(`${baseUrl}/tasks`)

    response.assertStatus(200)
    response.assertBodyContains({ message: "Tarefas encontadas!", data: Array<Task>() });
  });

  test('get task by id', async ({ client }) => {
    const tasks = await Task.all();
    const taskId = tasks[0].id;
    const response = await client.get(`${baseUrl}/tasks/` + taskId)

    response.assertStatus(200)
    response.assertBodyContains({ message: "Tarefa encontada!", data: Object });
  });

  test('create a task', async ({ assert }) => {
    const taskData = {
      title: 'Nova Tarefa',
      description: 'Descrição da nova tarefa',
      favorite: false,
      color: 'green'
    };

    const task = await Task.create(taskData);
    assert.isString(task);
  })

  test('update a task', async ({ assert }) => {
    const tasks = await Task.all();
    const taskId = tasks[0].id;

    const taskData = {
      title: 'Nova Tarefa updt',
      description: 'Descrição da nova tarefa updt',
      favorite: true,
      color: 'blue'
    };

    const task = await Task.update(taskId, taskData);
    assert.isNumber(task);
  })

  test('delete a task', async ({ assert }) => {
    const tasks = await Task.all();
    const taskId = tasks[0].id;

    const task = await Task.delete(taskId);
    assert.isNumber(task);
  })
});
