import { EncrypterProvider } from '../../../../../shared/infra/providers/Encrypter.provider';
import { CreateUserBodyDTO } from '../../../domain/dtos/requests/CreateUser.request.dto';
import { HashProvider } from '../../providers/hash.provider';
import { UserRepository } from './user.repository';
import { faker } from '@faker-js/faker';

describe('User Repository Test Suites', () => {
  let repository: UserRepository;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(() => {
    repository = new UserRepository(
      new HashProvider(),
      new EncrypterProvider(),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockUser = {
    id_user: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    createdAt: new Date(),
  };

  describe('findById method tests', () => {
    it('should not find a user given an invalid ID', async () => {
      const invalidId = 'invalid-id';

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(null);

      const result = await repository.findById(invalidId);

      expect(result).toBeNull();
      expect(repository.findById).toHaveBeenCalledWith(invalidId);
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });

    it('should find a user by ID', async () => {
      const validId = 'valid-id';

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(mockUser);

      const result = await repository.findById(validId);

      expect(result).toEqual(mockUser);
      expect(repository.findById).toHaveBeenCalledWith(validId);
      expect(repository.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('findByEmail method tests', () => {
    it('should not find a user given an invalid email', async () => {
      const invalidEmail = 'invalid-email';

      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(null);

      const result = await repository.findByEmail(invalidEmail);

      expect(result).toBeNull();
      expect(repository.findByEmail).toHaveBeenCalledWith(invalidEmail);
      expect(repository.findByEmail).toHaveBeenCalledTimes(1);
    });

    it('should find a user by email', async () => {
      const validEmail = 'valid-email';

      jest.spyOn(repository, 'findByEmail').mockResolvedValueOnce(mockUser);

      const result = await repository.findByEmail(validEmail);

      expect(result).toEqual(mockUser);
      expect(repository.findByEmail).toHaveBeenCalledWith(validEmail);
      expect(repository.findByEmail).toHaveBeenCalledTimes(1);
    });
  });

  describe('setPassword method tests', () => {
    it('should not set a password for an invalid user ID', async () => {
      const invalidId = 'invalid-id';
      const password = 'new-password';

      jest.spyOn(repository, 'setPassword').mockResolvedValueOnce(null);

      const result = await repository.setPassword(invalidId, password);

      expect(result).toBeNull();
      expect(repository.setPassword).toHaveBeenCalledWith(invalidId, password);
      expect(repository.setPassword).toHaveBeenCalledTimes(1);
    });

    it('should set a password for a valid user ID', async () => {
      const validId = 'valid-id';
      const password = 'new-password';

      jest.spyOn(repository, 'setPassword').mockResolvedValueOnce(mockUser);

      const result = await repository.setPassword(validId, password);

      expect(result).toEqual(mockUser);
      expect(repository.setPassword).toHaveBeenCalledWith(validId, password);
      expect(repository.setPassword).toHaveBeenCalledTimes(1);
    });
  });

  describe('create method tests', () => {
    it('should create a new user with valid data', async () => {
      const createUserDTO: CreateUserBodyDTO = {
        password: 'new-password',
        password_confirmation: 'new-password',
        email: 'new-email',
        name: 'New User',
      };

      jest.spyOn(repository, 'create').mockResolvedValueOnce(mockUser as any);

      const result = await repository.create(createUserDTO);

      expect(result).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDTO);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('comparePassword method tests', () => {
    it('should return false for an invalid user ID', async () => {
      const invalidId = 'invalid-id';
      const password = 'password';

      jest.spyOn(repository, 'comparePassword').mockResolvedValueOnce(null);

      const result = await repository.comparePassword(invalidId, password);

      expect(result).toBeNull();
      expect(repository.comparePassword).toHaveBeenCalledWith(
        invalidId,
        password,
      );
      expect(repository.comparePassword).toHaveBeenCalledTimes(1);
    });

    it('should return true for a valid user ID and correct password', async () => {
      const validId = 'valid-id';
      const password = 'correct-password';

      jest.spyOn(repository, 'comparePassword').mockResolvedValueOnce(true);

      const result = await repository.comparePassword(validId, password);

      expect(result).toBe(true);
      expect(repository.comparePassword).toHaveBeenCalledWith(
        validId,
        password,
      );
      expect(repository.comparePassword).toHaveBeenCalledTimes(1);
    });

    it('should return false for a valid user ID and incorrect password', async () => {
      const validId = 'valid-id';
      const password = 'incorrect-password';

      jest.spyOn(repository, 'comparePassword').mockResolvedValueOnce(false);

      const result = await repository.comparePassword(validId, password);

      expect(result).toBe(false);
      expect(repository.comparePassword).toHaveBeenCalledWith(
        validId,
        password,
      );
      expect(repository.comparePassword).toHaveBeenCalledTimes(1);
    });
  });
});
