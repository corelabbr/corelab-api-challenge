import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JWTProvider } from '../providers/jwt.provider';
import { HashProvider } from '../providers/hash.provider';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { UserRepository } from '../db/repositories/user.repository';
import { AuthenticationMiddleware } from '../../http/middlewares/Auth.middleware';
import { UserController } from '../../http/controllers/user.controller';
import { DateProvider } from '../../../../shared/infra/providers/Date.provider';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { UserLoginUsecase } from '../usecases/user-login.usecase';
import { HomeDataUsecase } from '../usecases/home-data.usecase';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    JWTProvider,
    HashProvider,
    EncrypterProvider,
    UserRepository,
    DateProvider,
    CreateUserUseCase,
    UserLoginUsecase,
    HomeDataUsecase,
  ],
  exports: [JWTProvider, HashProvider],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes({
      path: 'user/home-data',
      method: RequestMethod.GET,
    });
  }
}
