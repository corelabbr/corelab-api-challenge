import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { INestApplication } from '@nestjs/common';
import { PrismaProvider } from '../../../../shared/infra/providers/Prisma.provider';
import { AppModule } from '../../../../app/app.module';
import { UserModule } from '../../infra/modules/user.module';
import { SharedModule } from '../../../../shared/infra/modules/Shared.module';
import { Environment } from '../../../../shared/config/app.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { faker } from '@faker-js/faker';
import { CreateUserBodyDTO } from '../../domain/dtos/requests/CreateUser.request.dto';
import { userSeeder } from '../../../../shared/infra/db/prisma/seeders/user.seed';
import { InvalidCredentialsException } from '../../domain/dtos/errors/InvalidCredentials.exception';

describe('User Controller - /user', () => {
  const controllerRoute = '/user';
  const registerUserRoute = `${controllerRoute}/register`;
  const loginUserRoute = `${controllerRoute}/login`;

  let controller: UserController;

  let app: INestApplication;
  let prisma: PrismaProvider;
  let jwtToken: string;

  const password = 'SenhaValida@1234$';

  let data: CreateUserBodyDTO;

  let mockdata = {
    id_user: faker.string.uuid(),
    name: 'Fulano de Tal',
    email: faker.internet.email(),
    password: password,
  };

  data = mockdata;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule, SharedModule],
      providers: [PrismaProvider],
    })
      .overrideProvider(PrismaProvider)
      .useValue(new PrismaProvider(Environment.TEST))
      .compile();

    prisma = moduleRef.get(PrismaProvider);

    app = moduleRef.createNestApplication<NestExpressApplication>();
    app.useGlobalFilters();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await prisma.seed([userSeeder]);
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await prisma.clear('all');
  });

  describe('POST /register', () => {
    describe('\nSuccessful cases:', () => {
      it('should register a new user successfully', async () => {
        expect(async () => {
          const response = await request(app.getHttpServer())
            .post(registerUserRoute)
            .send({
              ...data,
            })
            .set('Accept', 'application/json');

          expect(response.status).toBe(201);
          expect(response.body).toHaveProperty('token');
          expect(response.body).toHaveProperty('user');
          expect(response.body.user).toHaveProperty('id_user');
          expect(response.body.user.name).toBe('Fulano de Tal');
        });
      });
    });
    describe('\nUnsuccessful cases:', () => {});
  });

  describe('POST /login', () => {
    describe('\nSuccessful cases:', () => {
      it('should return 200 and instance of UserLoginResponseDTO on successful login', async () => {
        const response = await request(app.getHttpServer())
          .post(loginUserRoute)
          .send({
            email: 'usuario_corenotes@gmail.com',
            password: 'senha123',
          })
          .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
        jwtToken = response.body.token;
      });
    });

    describe('\nUnsuccessful cases:', () => {
      describe('\nInvalid Credentials', () => {
        it('should return InvalidCredentialsException if user login data is invalid', async () => {
          const response = await request(app.getHttpServer())
            .post(loginUserRoute)
            .send(data)
            .set('Accept', 'application/json');

          expect(response.status).toBe(
            new InvalidCredentialsException().getStatus(),
          );
          expect(response.body.message).toBe(
            new InvalidCredentialsException().message,
          );
        });
      });
    });
  });
});
