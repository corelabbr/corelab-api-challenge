import { Module } from '@nestjs/common';
import { NoteService } from './service/note.service';
import { NoteController } from './controller/note.controller';
import { NoteRepository } from './repository/note.repository';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';
import { UserRepository } from '../user/repository/user.repository';

@Module({
  providers: [NoteService, NoteRepository, FavoriteRepository, UserRepository],
  controllers: [NoteController],
})
export class NoteModule {}
