import { DateProvider } from '../../../../shared/infra/providers/Date.provider';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { InvalidCredentialsException } from '../../domain/dtos/errors/InvalidCredentials.exception';
import { UserRepository } from '../db/repositories/user.repository';
import { HashProvider } from '../providers/hash.provider';
import { JWTProvider } from '../providers/jwt.provider';
import { UserLoginUsecase } from './user-login.usecase';
import { faker } from '@faker-js/faker';

describe('User Login Usecase Test Suites', () => {
  let usecase: UserLoginUsecase;
  let mockRepository: UserRepository;
  let encrypterProvider: EncrypterProvider;
  let hashProvider: HashProvider;
  let jwtProvider: JWTProvider;
  let dateProvider: DateProvider;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(async () => {
    encrypterProvider = new EncrypterProvider();
    hashProvider = new HashProvider();
    dateProvider = new DateProvider();
    mockRepository = new UserRepository(hashProvider, encrypterProvider);
    jwtProvider = new JWTProvider();
    usecase = new UserLoginUsecase(mockRepository, jwtProvider);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const ip = faker.internet.ip();

  it('should throw InvalidCredentialsException if user not found', async () => {
    const data = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    jest.spyOn(mockRepository, 'findByEmail').mockResolvedValueOnce(null);

    await expect(usecase.execute(data, ip)).rejects.toThrow(
      InvalidCredentialsException,
    );
  });

  it('should return a valid token and user data on successful login', async () => {
    const mockUser = {
      id_user: faker.string.uuid(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      created_at: new Date(),
    };

    const data = {
      email: mockUser.email,
      password: faker.internet.password(),
    };

    jest
      .spyOn(mockRepository, 'findByEmail')
      .mockResolvedValueOnce(mockUser as any);
    jest.spyOn(mockRepository, 'comparePassword').mockResolvedValueOnce(true);
    jest.spyOn(jwtProvider, 'generate').mockReturnValue('valid-token');

    const result = await usecase.execute(data, ip);

    expect(result).toEqual({
      token: 'valid-token',
      user: {
        id_user: mockUser.id_user,
        name: mockUser.name,
      },
    });
  });
});
