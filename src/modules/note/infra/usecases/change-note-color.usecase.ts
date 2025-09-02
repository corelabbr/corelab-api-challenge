import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { NoteRepository } from '../db/repositories/note.repository';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { ColorAlreadySetException } from '../../domain/dtos/errors/ColorAlreadySetException.exception';
import { ChangeNoteColorRequestDto } from '../../domain/dtos/requests/ChangeNoteColor.request.dto';

export class ChangeNoteColorUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private noteRepository: NoteRepository,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(
    id_user: string,
    data: ChangeNoteColorRequestDto,
  ): Promise<
    | boolean
    | ColorAlreadySetException
    | UserNotFoundException
    | UnauthorizedException
    | NoteNotFoundException
  > {
    const user = await this.userRepository.findById(id_user);

    if (!user) throw new UserNotFoundException();

    const note = await this.noteRepository.findById(data.note_id);

    if (!note) throw new NoteNotFoundException();

    if (note.user_id !== user.id_user) throw new UnauthorizedException();

    if (note.note_color === data.note_color)
      throw new ColorAlreadySetException();

    const updated = await this.noteRepository.changeColor(
      data.note_id,
      data.note_color,
    );

    return !!updated;
  }
}
