import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisOptions } from '../shared/config/redis.config';
import { SharedModule } from '../shared/infra/modules/Shared.module';
import { UserModule } from '../modules/user/infra/modules/user.module';
import { NoteModule } from '../modules/note/infra/modules/note.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.registerAsync(RedisOptions),
    SharedModule,
    UserModule,
    NoteModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
