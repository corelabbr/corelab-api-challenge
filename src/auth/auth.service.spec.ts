/* eslint-disable @typescript-eslint/unbound-method */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

const userMock = {
  id: '1',
  email: 'user@mail.com',
  password: 'hashed',
  role: 'USER',
};

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const usersServiceMock = {
      findByEmail: jest.fn(),
    };
    const jwtServiceMock = {
      signAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validateUser should throw if user not found', async () => {
    jest.spyOn(usersService, 'findByEmail').mockResolvedValueOnce(null);
    await expect(
      service.validateUser('notfound@mail.com', '123'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('validateUser should throw if password is invalid', async () => {
    jest
      .spyOn(usersService, 'findByEmail')
      .mockResolvedValueOnce(userMock as User);
    (
      jest.spyOn(bcrypt, 'compare') as unknown as jest.Mock
    ).mockResolvedValueOnce(false);
    await expect(
      service.validateUser(userMock.email, 'wrongpass'),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('validateUser should return user if credentials are valid', async () => {
    jest
      .spyOn(usersService, 'findByEmail')
      .mockResolvedValueOnce(userMock as User);
    (
      jest.spyOn(bcrypt, 'compare') as unknown as jest.Mock
    ).mockResolvedValueOnce(true);
    const result = await service.validateUser(userMock.email, '123');
    expect(result).toEqual(userMock);
  });

  it('login should return access_token', async () => {
    (jwtService.signAsync as jest.Mock).mockResolvedValueOnce('token123');
    const result = await service.login(userMock as User);
    expect(result).toEqual({ access_token: 'token123' });
    expect(jwtService.signAsync).toHaveBeenCalledWith({
      email: userMock.email,
      sub: userMock.id,
      role: userMock.role,
    });
  });
});
