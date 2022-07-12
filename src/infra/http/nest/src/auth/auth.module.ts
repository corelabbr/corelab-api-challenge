import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { configJWT } from '../config/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { usersProviders } from '../user/users.providers';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: configJWT.secret,
      signOptions: { expiresIn: configJWT.expiresIn },
    }),
  ],
  providers: [...usersProviders, AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
