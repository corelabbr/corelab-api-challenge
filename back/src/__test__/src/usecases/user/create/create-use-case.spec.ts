import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CreateUseCase } from '@usecases/user/create-use-case';
import { setupMockUser, mockUser, mockUserRepository } from './create-use-case.mock';

describe('CreateUseCase', () => {
  beforeEach(async () => {
    await setupMockUser();
  });

  it('deve criar um novo usuário utilizando o repositório', async () => {
    const createUseCase = new CreateUseCase(mockUserRepository);
    const resultado = await createUseCase.execute(mockUser);

    expect(mockUserRepository.create).toHaveBeenCalledWith(mockUser);
    expect(resultado).toEqual(mockUser);
  });

  it('não deve permitir criar um usuário com e-mail já existente', async () => {
    const createUseCase = new CreateUseCase({
      ...mockUserRepository,
      findByEmail: vi.fn().mockResolvedValue(mockUser),
    });

    await expect(() => createUseCase.execute(mockUser))
      .rejects
      .toThrowError('Ops! Esse e-mail já foi registrado por outro usuário.');
  });

  it('deve lançar erro se o repositório falhar ao criar o usuário', async () => {
    const createUseCase = new CreateUseCase({
      ...mockUserRepository,
      create: vi.fn().mockRejectedValue(new Error('Erro no banco')),
    });

    await expect(() => createUseCase.execute(mockUser))
      .rejects
      .toThrowError('Erro no banco');
  });

  it('deve lançar erro se o e-mail estiver vazio', async () => {
    const createUseCase = new CreateUseCase(mockUserRepository);
    const userInvalido = { ...mockUser, email: '' };

    await expect(() => createUseCase.execute(userInvalido))
      .rejects
      .toThrowError('O campo e-mail é obrigatório.');
  });
});
