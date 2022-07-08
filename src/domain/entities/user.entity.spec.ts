import { User } from './user.entity';

describe('UserEntity', () => {
  it('should be create a new user', () => {
    const user = new User({
      name: 'John Doe',
      username: 'johndoe',
      password: '123456',
      createdAt: new Date(),
    });

    expect(user.name).toBe('John Doe');
    expect(user.username).toBe('johndoe');
    expect(user.password).toBe('123456');
    expect(user.createdAt).toBeInstanceOf(Date);
  });
});
