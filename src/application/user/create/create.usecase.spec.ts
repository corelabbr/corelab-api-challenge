import { UserInMemoryRepository } from '@infra/db/memory/UserInMemory.repository';
import { CreateUserUseCase } from './create.usecase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let userRepository: UserInMemoryRepository;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it('should be create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
    });

    expect(user.name).toBe('John Doe');
    expect(user.username).toBe('johndoe');
    expect(user.password).toBe('123456');
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
