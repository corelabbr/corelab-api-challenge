import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { FavoriteController } from './controller/favorite.controller';
import { FavoriteRepository } from './repository/favorite.repository';
import { AuthenticationMiddleware } from '../user/middlewares/auth.middleware';
import { JWTProvider } from '../user/providers/jwt.provider';
import { NoteRepository } from '../note/repository/note.repository';

@Module({
  providers: [FavoriteService, FavoriteRepository, NoteRepository, JWTProvider],
  controllers: [FavoriteController],
})
export class FavoriteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .forRoutes(
        { path: 'note/favorite/:id', method: RequestMethod.POST },
        { path: 'note/unfavorite/:id', method: RequestMethod.DELETE },
      );
  }
}