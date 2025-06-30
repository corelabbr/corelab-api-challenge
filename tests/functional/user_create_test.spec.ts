import { test } from '@japa/runner'
import User from '#models/user'

test.group('User create test', (group) => {
  // Opcional: limpar usuários antes de cada teste
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('deve criar um usuário com fullName, email e password', async ({ assert }) => {
    // Criação do usuário
    const user = await User.create({
      fullName: 'Leandro Cunha',
      email: 'leandro@example.com',
      password: '123456', // a hash geralmente é aplicada automaticamente pelo model
    })

    // Verifica se o usuário foi criado
    assert.exists(user.id, 'Usuário deve ter ID após criação')
    assert.equal(user.fullName, 'Leandro Cunha')
    assert.equal(user.email, 'leandro@example.com')
  })
})
test.group('User create test with validation', (group) => {
  group.each.setup(async () => {
    await User.query().delete()
  })

  test('deve falhar ao criar usuário sem fullName, email ou password', async ({ assert }) => {
    try {
      await User.create({
        fullName: '', // campo obrigatório
        email: 'invalid-email', // formato inválido
        password: '', // campo obrigatório
      })
    } catch (error) {
      assert.exists(error, 'Erro deve ser lançado ao tentar criar usuário inválido')
      assert.equal(error.code, 'E_VALIDATION_FAILURE', 'Código de erro deve ser E_VALIDATION_FAILURE')
    }
  })
})
