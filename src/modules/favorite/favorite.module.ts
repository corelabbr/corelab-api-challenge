import { Module } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { FavoriteController } from './controller/favorite.controller';
import { FavoriteRepository } from './repository/favorite.repository';

@Module({
  providers: [FavoriteService, FavoriteRepository],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
