import { test } from '@japa/runner'
import User from '#models/user'

test.group('User login test', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('deve autenticar um usuário com email e senha válidos', async ({ client, assert }) => {
    const user = await User.create({
      fullName: 'Leandro Cunha',
      email: 'leandro@example.com',
      password: '123456', // Deve ser hasheado pelo model
    })

    const response = await client.post('/api/login').form({
      email: user.email,
      password: '123456',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token: {
        type: 'bearer',
      },
    })

    assert.exists(response.body().token.value, 'Token deve conter a chave value')
  })

  test('deve falhar login com senha incorreta', async ({ client }) => {
    const user = await User.create({
      fullName: 'Leandro Cunha',
      email: 'leandro@example.com',
      password: '123456',
    })

    const response = await client.post('/api/login').form({
      email: user.email,
      password: 'senhaerrada',
    })

    response.assertStatus(401)
    response.assertBodyContains({
      message: 'Credenciais inválidas',
    })
  })
})

test.group('User login test with validation', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('deve falhar ao fazer login sem email ou senha', async ({ client }) => {
    const response = await client.post('/api/login').form({
      email: '',
      password: '',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      message: 'Erro de validação ao fazer login',
      error: {
        code: 'E_VALIDATION_ERROR',
        messages: [
          { field: 'email' },
          { field: 'password' },
        ],
      },
    })
  })

  test('deve falhar ao fazer login com email inválido', async ({ client }) => {
    const response = await client.post('/api/login').form({
      email: 'invalid-email',
      password: '123456',
    })

    response.assertStatus(422)
    response.assertBodyContains({
      message: 'Erro de validação ao fazer login',
      error: {
        code: 'E_VALIDATION_ERROR',
        messages: [
          {
            field: 'email',
            rule: 'email',
          },
        ],
      },
    })
  })
})
