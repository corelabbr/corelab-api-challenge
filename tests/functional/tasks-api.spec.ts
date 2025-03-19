import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Task from 'App/Models/Task'

test.group('TasksController', (group) => {
  // Hooks para limpar o banco de dados antes e depois dos testes
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  // Teste para listar todas as tarefas
  test('list all tasks', async ({ client }) => {
    // Cria uma tarefa de exemplo no banco de dados
    await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      isCompleted: false,
      isFavorite: false,
      color: '#FF0000',
    })

    // Faz a requisição para listar as tarefas
    const response = await client.get('/tasks')

    // Verifica a resposta
    response.assertStatus(200)
    response.assertBodyContains([
      {
        title: 'Test Task',
        description: 'Test Description',
        isCompleted: false,
        isFavorite: false,
        color: '#FF0000',
      },
    ])
  })

  // Teste para criar uma nova tarefa
  test('create a new task', async ({ client }) => {
    const taskData = {
      title: 'New Task',
      description: 'New Description',
      isCompleted: false,
      isFavorite: false,
      color: '#00FF00',
    }

    // Faz a requisição para criar uma tarefa
    const response = await client.post('/tasks').json(taskData)

    // Verifica a resposta
    response.assertStatus(201)
    response.assertBodyContains({
      title: 'New Task',
      description: 'New Description',
      isCompleted: false,
      isFavorite: false,
      color: '#00FF00',
    })
  })

  // Teste para mostrar uma tarefa específica
  test('show a specific task', async ({ client }) => {
    // Cria uma tarefa de exemplo no banco de dados
    const task = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      isCompleted: false,
      isFavorite: false,
      color: '#FF0000',
    })

    // Faz a requisição para mostrar a tarefa
    const response = await client.get(`/tasks/${task.id}`)

    // Verifica a resposta
    response.assertStatus(200)
    response.assertBodyContains({
      id: task.id,
      title: 'Test Task',
      description: 'Test Description',
      isCompleted: false,
      isFavorite: false,
      color: '#FF0000',
    })
  })

  // Teste para atualizar uma tarefa
  test('update a task', async ({ client }) => {
    // Cria uma tarefa de exemplo no banco de dados
    const task = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      isCompleted: false,
      isFavorite: false,
      color: '#FF0000',
    })

    // Dados para atualização
    const updatedData = {
      title: 'Updated Task',
      isCompleted: true,
      color: '#00FF00',
    }

    // Faz a requisição para atualizar a tarefa
    const response = await client.put(`/tasks/${task.id}`).json(updatedData)

    // Verifica a resposta
    response.assertStatus(200)
    response.assertBodyContains({
      id: task.id,
      title: 'Updated Task',
      isCompleted: true,
      color: '#00FF00',
    })
  })

  // Teste para excluir uma tarefa
  test('delete a task', async ({ client }) => {
    // Cria uma tarefa de exemplo no banco de dados
    const task = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      isCompleted: false,
      isFavorite: false,
      color: '#FF0000',
    })

    // Faz a requisição para excluir a tarefa
    const response = await client.delete(`/tasks/${task.id}`)

    // Verifica a resposta
    response.assertStatus(204)
    response.assertBodyContains({ message: 'Task deleted' })

    // Verifica se a tarefa foi realmente excluída //TODO
    // const deletedTask = await Task.find(task.id)
    
  })

  // Teste para marcar/desmarcar como favorito
  test('toggle favorite status of a task', async ({ client }) => {
    // Cria uma tarefa de exemplo no banco de dados
    const task = await Task.create({
      title: 'Test Task',
      description: 'Test Description',
      isCompleted: false,
      isFavorite: false,
      color: '#FF0000',
    })

    // Faz a requisição para marcar como favorito
    const response = await client.patch(`/tasks/${task.id}/toggle-favorite`)

    // Verifica a resposta
    response.assertStatus(200)
    response.assertBodyContains({
      id: task.id,
      isFavorite: true,
    })
  })
})