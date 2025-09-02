import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { NoteController } from '../../http/controllers/note.controller';
import { DateProvider } from '../../../../shared/infra/providers/Date.provider';
import { AuthenticationMiddleware } from '../../../user/http/middlewares/Auth.middleware';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { JWTProvider } from '../../../user/infra/providers/jwt.provider';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { NoteRepository } from '../db/repositories/note.repository';
import { CreateNoteUsecase } from '../usecases/create-note.usecase';
import { FindNoteByIdUsecase } from '../usecases/find-note-by-id.usecase';
import { BrowseNotesUsecase } from '../usecases/browse-notes.usecase';
import { EditNoteUsecase } from '../usecases/edit-note.usecase';
import { DeleteNoteUsecase } from '../usecases/delete-note.usecase';
import { ChangeNoteColorUsecase } from '../usecases/change-note-color.usecase';
import { StarNoteUsecase } from '../usecases/star-note.usecase';
import { SearchNotesUsecase } from '../usecases/search-notes.usecase';

@Module({
  imports: [],
  controllers: [NoteController],
  providers: [
    JWTProvider,
    HashProvider,
    EncrypterProvider,
    UserRepository,
    DateProvider,
    NoteRepository,
    SearchNotesUsecase,
    CreateNoteUsecase,
    FindNoteByIdUsecase,
    BrowseNotesUsecase,
    UserRepository,
    ChangeNoteColorUsecase,
    StarNoteUsecase,
    EditNoteUsecase,
    DeleteNoteUsecase,
  ],
})
export class NoteModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(
      {
        path: 'notes/search',
        method: RequestMethod.GET,
      },
      {
        path: 'notes/browse',
        method: RequestMethod.GET,
      },
      {
        path: 'notes/find/:noteId',
        method: RequestMethod.GET,
      },
      {
        path: 'notes/create',
        method: RequestMethod.POST,
      },
      {
        path: 'notes/star',
        method: RequestMethod.POST,
      },
      {
        path: 'notes/change-color',
        method: RequestMethod.POST,
      },
      {
        path: 'notes/edit/:cuid',
        method: RequestMethod.PATCH,
      },
      {
        path: 'notes/delete/:cuid',
        method: RequestMethod.DELETE,
      },
    );
  }
}
