import { UnprocessableEntityException } from '@nestjs/common';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { EmailAlreadyRegisteredException } from '../../domain/dtos/errors/EmailAlreadyRegistered.exception';
import { CreateUserBodyDTO } from '../../domain/dtos/requests/CreateUser.request.dto';
import { UserRepository } from '../db/repositories/user.repository';
import { HashProvider } from '../providers/hash.provider';
import { JWTProvider } from '../providers/jwt.provider';
import { CreateUserUseCase } from './create-user.usecase';
import { faker } from '@faker-js/faker';

describe('User Register Use Case Test Suites', () => {
  let useCase: CreateUserUseCase;
  let hashProvider: HashProvider;
  let encrypterProvider: EncrypterProvider;
  let jwtProvider: JWTProvider;
  let mockUserRepository: UserRepository;
  let data: CreateUserBodyDTO;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(async () => {
    encrypterProvider = new EncrypterProvider();
    hashProvider = new HashProvider();
    jwtProvider = new JWTProvider();
    mockUserRepository = new UserRepository(hashProvider, encrypterProvider);
    useCase = new CreateUserUseCase(
      hashProvider,
      jwtProvider,
      mockUserRepository,
    );

    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
  const password = 'SenhaValida@1234$';

  let mockdata = {
    id_user: faker.string.uuid(),
    name: 'Fulano de Tal',
    email: faker.internet.email(),
    password: password,
    password_confirmation: password,
  };

  data = mockdata;

  describe('unsuccessful cases', () => {
    it('should not create an user if the email is already in use', async () => {
      jest
        .spyOn(mockUserRepository, 'findByEmail')
        .mockResolvedValueOnce(data as any);

      await expect(useCase.execute(data)).rejects.toThrow(
        EmailAlreadyRegisteredException,
      );
    });

    it('should not create an user if the passwords do not match', async () => {
      data.password_confirmation = '';

      jest.spyOn(mockUserRepository, 'findByEmail').mockResolvedValueOnce(null);

      await expect(useCase.execute(data)).rejects.toThrow(
        UnprocessableEntityException,
      );
    });

    it('should not create an user if the name is not validly formatted', async () => {
      data.name = faker.person.firstName();

      await expect(useCase.execute(data)).rejects.toThrow(
        UnprocessableDataException,
      );

      data = mockdata;
    });

    it('should not create an user if the email is invalid', async () => {
      data.email = '';

      await expect(useCase.execute(data)).rejects.toThrow(
        UnprocessableDataException,
      );
      data = mockdata;
    });

    it('should not create an user if the password is misformatted', async () => {
      data.password = '';

      await expect(useCase.execute(data)).rejects.toThrow(
        UnprocessableDataException,
      );

      data = mockdata;
    });
  });

  describe('successful cases', () => {
    it('should create an user given valid data', async () => {
      data = {
        name: 'Fulano de Tal',
        email: faker.internet.email(),
        password: password,
        password_confirmation: password,
      };

      jest.spyOn(mockUserRepository, 'findByEmail').mockResolvedValueOnce(null);

      jest.spyOn(hashProvider, 'hash').mockResolvedValue(data.password as any);

      jest
        .spyOn(mockUserRepository, 'create')
        .mockResolvedValue(mockdata as any);

      jest.spyOn(jwtProvider, 'generate').mockReturnValue('valid-token');

      const result = await useCase.execute(data);

      expect(result).toEqual({
        token: 'valid-token',
        id: mockdata.id_user,
      });
    });
  });
});
