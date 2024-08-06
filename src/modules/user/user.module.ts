import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserRepository } from './repository/user.repository';
import { HashProvider } from './providers/hash.provider';
import { JWTProvider } from './providers/jwt.provider';

@Module({
  providers: [UserService, UserRepository, HashProvider, JWTProvider],
  controllers: [UserController],
})
export class UserModule {}
