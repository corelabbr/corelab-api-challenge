import { Module } from '@nestjs/common';
import { FavoriteService } from './service/favorite.service';
import { FavoriteController } from './controller/favorite.controller';

@Module({
  providers: [FavoriteService],
  controllers: [FavoriteController],
})
export class FavoriteModule {}
