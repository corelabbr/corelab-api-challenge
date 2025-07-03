import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

const userArray = [
  {
    id: '1',
    name: 'User1',
    email: 'user1@mail.com',
    password: 'hashed',
    role: 'USER',
    listNotes: [],
  },
  {
    id: '2',
    name: 'User2',
    email: 'user2@mail.com',
    password: 'hashed',
    role: 'ADMIN',
    listNotes: [],
  },
];

const userRepositoryMock = {
  find: jest.fn().mockResolvedValue(userArray),
  findOne: jest
    .fn()
    .mockImplementation(({ where: { id } }) =>
      Promise.resolve(userArray.find((u) => u.id === id)),
    ),
  findOneBy: jest
    .fn()
    .mockImplementation(({ email }) =>
      Promise.resolve(userArray.find((u) => u.email === email)),
    ),
  create: jest.fn().mockImplementation((dto: CreateUserDto) => dto),
  save: jest
    .fn()
    .mockImplementation((user) => Promise.resolve({ ...user, id: '3' })),
  update: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
};

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed'),
}));

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all users', async () => {
    const result = await service.findAll();
    expect(result).toEqual(userArray);
    expect(userRepositoryMock.find).toHaveBeenCalled();
  });

  it('findOne should return a user by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual(userArray[0]);
    expect(userRepositoryMock.findOne).toHaveBeenCalled();
  });

  it('findByEmail should return a user by email', async () => {
    const result = await service.findByEmail('user1@mail.com');
    expect(result).toEqual(userArray[0]);
    expect(userRepositoryMock.findOneBy).toHaveBeenCalled();
  });

  it('create should throw ConflictException if email exists', async () => {
    await expect(
      service.create({
        name: 'User1',
        email: 'user1@mail.com',
        password: '123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('create should create a new user if email does not exist', async () => {
    userRepositoryMock.findOneBy.mockResolvedValueOnce(undefined);
    const dto = { name: 'New', email: 'new@mail.com', password: '123' };
    const result = await service.create(dto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('password', 'hashed');
    expect(userRepositoryMock.save).toHaveBeenCalled();
  });

  it('createAdmin should throw ConflictException if email exists', async () => {
    await expect(
      service.createAdmin({
        name: 'User1',
        email: 'user1@mail.com',
        password: '123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('createAdmin should create a new admin user if email does not exist', async () => {
    userRepositoryMock.findOneBy.mockResolvedValueOnce(undefined);
    const dto = { name: 'Admin', email: 'admin@mail.com', password: '123' };
    const result = await service.createAdmin(dto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('role', 'ADMIN');
    expect(userRepositoryMock.save).toHaveBeenCalled();
  });

  it('update should hash password if provided', async () => {
    const updateDto = { password: 'newpass' };
    const result = await service.update('1', updateDto);
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(userRepositoryMock.update).toHaveBeenCalledWith('1', {
      password: 'hashed',
    });
    expect(result).toEqual(userArray[0]);
  });

  it('remove should delete user', async () => {
    const result = await service.remove('1');
    expect(result).toEqual({ deleted: true });
    expect(userRepositoryMock.delete).toHaveBeenCalledWith('1');
  });
});
