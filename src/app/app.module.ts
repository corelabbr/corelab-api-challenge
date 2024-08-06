import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../modules/user/user.module';
import { NoteModule } from '../modules/note/note.module';
import { FavoriteModule } from '../modules/favorite/favorite.module';

@Module({
  imports: [DatabaseModule, UserModule, NoteModule, FavoriteModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
