import { User } from '@domain/entities/user.entity';
import { UserInMemoryRepository } from '@infra/db/memory/UserInMemory.repository';
import { FindOneUserUseCase } from './findOne.usecase';

describe('FindOneUserUseCase', () => {
  let userRepository: UserInMemoryRepository;
  let findOneUserUseCase: FindOneUserUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    findOneUserUseCase = new FindOneUserUseCase(userRepository);
    const user = new User({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
    });

    userRepository.save(user);
  });

  it('should be find a user by id', async () => {
    const user = await findOneUserUseCase.findById(1);

    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.username).toBe('johndoe');
    expect(user.password).toBe('123456');
  });

  it('should be find a user by username', async () => {
    const user = await findOneUserUseCase.findByUsername('johndoe');

    expect(user.id).toBe(1);
    expect(user.name).toBe('John Doe');
    expect(user.username).toBe('johndoe');
    expect(user.password).toBe('123456');
  });
});
