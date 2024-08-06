import { User } from './user.entity';

describe('User Entity Test Suites', () => {
  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const user = new User(1, 'username', 'email', 'password');

  it('an instance of the User class should have all of its attributes', async () => {
    expect(user).toHaveProperty('id_user');
    expect(user).toHaveProperty('username');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('deleted_at');
    expect(user).toHaveProperty('created_at');
    expect(user).toHaveProperty('updated_at');
  });

  it('an instance of the User class should have its id_user attribute being of type number', async () => {
    expect(user.id_user).toEqual(expect.any(Number));
  });

  it('an instance of the User class should have its username attribute being of type string', async () => {
    expect(user.username).toEqual(expect.any(String));
  });

  it('an instance of the User class should have its email attribute being of type string', async () => {
    expect(user.email).toEqual(expect.any(String));
  });

  it('an instance of the User class should have its password attribute being of type string', async () => {
    expect(user.password).toEqual(expect.any(String));
  });

  it('an instance of the User class should have its deleted_at attribute being null', async () => {
    expect(user.deleted_at).toBeNull();
  });

  it('an instance of the User class should have its created_at attribute being of type Date', async () => {
    expect(user.created_at).toEqual(expect.any(Date));
  });

  it('an instance of the User class should have its updated_at attribute being of type Date', async () => {
    expect(user.updated_at).toEqual(expect.any(Date));
  });
});