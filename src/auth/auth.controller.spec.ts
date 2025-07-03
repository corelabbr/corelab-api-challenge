import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

const userMock: User = {
  id: '1',
  name: 'Test User',
  email: 'user@mail.com',
  password: 'hashed',
  role: 'USER',
  createdDate: new Date(),
  listNotes: [],
};

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const authServiceMock = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authServiceMock }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login should validate user and return token', async () => {
    const dto: LoginDto = { email: 'user@mail.com', password: '123' };
    (service.validateUser as jest.Mock).mockResolvedValueOnce(userMock);
    (service.login as jest.Mock).mockResolvedValueOnce({
      access_token: 'token123',
    });

    const result = await controller.login(dto);

    expect(authServiceMock.validateUser).toHaveBeenCalledWith(
      dto.email,
      dto.password,
    );
    expect(authServiceMock.login).toHaveBeenCalledWith(userMock);
    expect(result).toEqual({ access_token: 'token123' });
  });

  it('getProfile should return user from request', () => {
    const req = { user: userMock };
    const result = controller.getProfile(req);
    expect(result).toEqual(userMock);
  });
});
