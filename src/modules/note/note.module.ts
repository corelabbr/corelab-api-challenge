import { Module } from '@nestjs/common';
import { NoteService } from './service/note.service';
import { NoteController } from './controller/note.controller';

@Module({
  providers: [NoteService],
  controllers: [NoteController]
})
export class NoteModule {}
