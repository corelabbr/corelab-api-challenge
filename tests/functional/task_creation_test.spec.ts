import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { ApiClient } from '@japa/api-client'
import { test } from '@japa/runner'

test.group('Criação de Tarefas', (group) => {
  group.each.setup(async () => {
    await db.rawQuery('DELETE FROM tasks')
    await db.rawQuery('DELETE FROM users')
  }) // Execute apenas em um banco de teste
  // Execute NODE_ENV=test node ace migration:run ou $env:NODE_ENV="test"; node ace migration:run
  // Se não, vai limpar todos os registros do banco de dados

  async function createUserAndGetToken(client: ApiClient) {
    await User.create({
      fullName: 'User Test',
      email: 'user1234@example.com',
      password: '123456',
    })

    const response = await client.post('/api/login').form({
      email: 'user1234@example.com',
      password: '123456',
    })

    response.assertStatus(201)
    return response.body().token?.value
  }

  test('cria tarefa válida com autenticação', async ({ client }) => {
    const token = await createUserAndGetToken(client)

    const response = await client
      .post('/api/tasks')
      .bearerToken(token)
      .json({
        title: 'Nova tarefa',
        text: 'Conteúdo da tarefa',
        isFavorite: false,
      })

    response.assertStatus(201)
  })

  test('retorna 401 se não autenticado', async ({ client }) => {
    const response = await client.post('/api/tasks').json({
      title: 'Tarefa sem token',
    })

    response.assertStatus(401)
    response.assertBodyContains({
      errors: [
        {
          message: 'Unauthorized access',
        },
      ],
    })
  })
})
