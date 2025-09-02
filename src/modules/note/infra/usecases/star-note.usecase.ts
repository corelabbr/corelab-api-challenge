import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { NoteRepository } from '../db/repositories/note.repository';
import { StarNoteRequestDto } from '../../domain/dtos/requests/StarNote.request.dto';

export class StarNoteUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private noteRepository: NoteRepository,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(
    data: StarNoteRequestDto,
    user_id: string,
  ): Promise<
    | boolean
    | NoteNotFoundException
    | UserNotFoundException
    | UnauthorizedException
  > {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new UserNotFoundException();

    const note = await this.noteRepository.findById(data.note_id);

    if (!note) throw new NoteNotFoundException();

    if (note.user_id !== user.id_user) throw new UnauthorizedException();

    const updated = await this.noteRepository.star(data.note_id);

    return updated?.starred as boolean;
  }
}
