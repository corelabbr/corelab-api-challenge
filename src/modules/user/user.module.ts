import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { HashProvider } from './providers/hash.provider';
import { JWTProvider } from './providers/jwt.provider';
import { AuthenticationMiddleware } from './middlewares/auth.middleware';

@Module({
  providers: [UserService, UserRepository, HashProvider, JWTProvider],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes({ path: 'user/home-data', method: RequestMethod.GET });
  }
}
