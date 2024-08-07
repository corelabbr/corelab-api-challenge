import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { NoteService } from './service/note.service';
import { NoteController } from './controller/note.controller';
import { NoteRepository } from './repository/note.repository';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';
import { UserRepository } from '../user/repository/user.repository';
import { AuthenticationMiddleware } from '../user/middlewares/auth.middleware';
import { JWTProvider } from '../user/providers/jwt.provider';

@Module({
  providers: [NoteService, NoteRepository, FavoriteRepository, UserRepository, JWTProvider],
  controllers: [NoteController],
})
export class NoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'note/browse', method: RequestMethod.GET },
        { path: 'note/find/:id', method: RequestMethod.GET },
        { path: 'note/create', method: RequestMethod.POST },
        { path: 'note/edit/:id', method: RequestMethod.PATCH },
        { path: 'note/delete/:id', method: RequestMethod.DELETE },
      );
  }
}