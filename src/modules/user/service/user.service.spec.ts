import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserRepository } from '../repository/user.repository';
import { HashProvider } from '../providers/hash.provider';
import { JWTProvider } from '../providers/jwt.provider';
import { UnprocessableDataException } from '../../../shared/domain/errors/UnprocessableData.exception';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository, HashProvider, JWTProvider],
      exports: [JWTProvider, HashProvider, UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should not create an user with an e-mail with more than 50 characters', async () => {
    const user = {
      email:
        'fulaninhodasilvamuitobacanaestoupreenchendocaracteresatoa@gmaaaaaaaaail.com',
      password: '@TestandoAlguma_Coisa_123456',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with an e-mail with less than 10 characters', async () => {
    const user = {
      email: 'a@oi.com',
      password: '@TestandoAlguma_Coisa_123456',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with an email without a domain', async () => {
    const user = {
      email: 'fulaninhodasilva',
      password: '@TestandoAlguma_Coisa_123456',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with an e-mail without a username', async () => {
    const user = {
      email: '@gmail.com',
      password: '@TestandoAlguma_Coisa_123456',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create a candidate with an uncompleted domain', async () => {
    const user = {
      email: 'fulano@com',
      password: '@TestandoAlguma_Coisa_123456',
      username: 'fulaninho',
    };
    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password with less then 15 characters', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: '1234',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password with more than 50 characters', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password:
        'Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1Ab1',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password without letters', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: '1234@4125@@',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password without numbers', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: 'abcdfg@@)$(@)$',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password without at least one capital letter', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: 'abcdfg@@)$(@412412)$',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password without special characters', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: 'abcdfgh21124981024',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with a password without at least one minor letter', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: '1131313@@@TESTEEEE',
      username: 'fulaninho',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with an username with less than 5 characters', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: 'SenhaDoFulano123@1@!@',
      username: 'f',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });

  it('should not create an user with an username with more than 15 characters', async () => {
    const user = {
      email: 'fulaninhodasilva@gmail.com',
      password: 'SenhaDoFulano123@1@!@',
      username: 'fffffffffffffffffffffffffffffffffffffffffffffffff',
    };

    expect(async () => {
      await userService.register(user);
    }).rejects.toThrow(UnprocessableDataException);
  });
});
