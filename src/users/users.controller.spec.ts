import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const userMock = {
  id: '1',
  name: 'User1',
  email: 'user1@mail.com',
  role: 'USER',
  listNotes: [],
};

describe('UsersController', () => {
  let controller: UsersController;

  const usersServiceMock = {
    findAll: jest.fn().mockResolvedValue([userMock]),
    findOne: jest.fn().mockResolvedValue(userMock),
    create: jest.fn().mockResolvedValue(userMock),
    createAdmin: jest.fn().mockResolvedValue({ ...userMock, role: 'ADMIN' }),
    update: jest.fn().mockResolvedValue({ ...userMock, name: 'Updated' }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: usersServiceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([userMock]);
    expect(usersServiceMock.findAll).toHaveBeenCalled();
  });

  it('findOne should return a user by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(userMock);
    expect(usersServiceMock.findOne).toHaveBeenCalledWith('1');
  });

  it('create should create a user', async () => {
    const dto: CreateUserDto = {
      name: 'User1',
      email: 'user1@mail.com',
      password: '123',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(userMock);
    expect(usersServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('createAdmin should create an admin user', async () => {
    const dto: CreateUserDto = {
      name: 'Admin',
      email: 'admin@mail.com',
      password: '123',
    };
    const result = await controller.createAdmin(dto);
    expect(result).toEqual({ ...userMock, role: 'ADMIN' });
    expect(usersServiceMock.createAdmin).toHaveBeenCalledWith(dto);
  });

  it('update should update a user', async () => {
    const dto: UpdateUserDto = { email: 'emailUpdated@mail.com' };
    const result = await controller.update('1', dto);
    expect(result).toEqual({ ...userMock, name: 'Updated' });
    expect(usersServiceMock.update).toHaveBeenCalledWith('1', dto);
  });

  it('remove should delete a user', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
    expect(usersServiceMock.remove).toHaveBeenCalledWith('1');
  });
});
