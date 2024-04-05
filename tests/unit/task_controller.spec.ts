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
    const task = await taskFactory();
    assert.isString(task);
  })

  test('update a task', async ({ assert }) => {
    const tasks = await Task.all();
    const taskId = tasks[0].id;

    const taskData = getTaskData();

    const task = await Task.update(taskId, taskData);
    assert.isNumber(task);
  })

  test('delete a task', async ({ client }) => {
    const tasks = await Task.all();
    const taskId = tasks[0].id;

    const response = await client.delete(`${baseUrl}/tasks/` + taskId)

    response.assertStatus(200)
    response.assertBodyContains({ message: "Tarefa excluída com sucesso!", id: Number });
  })

  test('find tasks by title or description', async ({ assert }) => {
    taskFactory();
    taskFactory();

    const searchTerm = 'Exemplo';
    const foundTasks = await Task.findByTitleOrDescription(searchTerm);

    assert.equal(foundTasks[0].title, 'Tarefa Exemplo 1');
    assert.equal(foundTasks[0].description, 'Descrição da Tarefa Exemplo 1');
    assert.equal(foundTasks[0].favorite, false);
    assert.equal(foundTasks[0].color, 'green');

    assert.equal(foundTasks[1].title, 'Tarefa Exemplo 2');
    assert.equal(foundTasks[1].description, 'Descrição da Tarefa Exemplo 2');
    assert.equal(foundTasks[1].favorite, true);
    assert.equal(foundTasks[1].color, 'red');

  });
});

function taskFactory() {
  const taskData = getTaskData();
  const task = Task.create(taskData);

  return task;
}

function getTaskData() {
  const taskData = {
    title: 'Nova Tarefa Exemplo',
    description: 'Descrição da nova tarefa exemplo',
    favorite: false,
    color: 'green'
  };

  return taskData;
}