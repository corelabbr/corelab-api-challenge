import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';

export class DeleteNoteUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly noteRepository: NoteRepository,
  ) {}
  async execute(
    note_id: string,
    user_id: string,
  ): Promise<
    | boolean
    | UserNotFoundException
    | UnauthorizedException
    | NoteNotFoundException
  > {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new UserNotFoundException();

    const note = await this.noteRepository.findById(note_id);

    if (!note) throw new NoteNotFoundException();

    if (note.user_id !== user_id) throw new UnauthorizedException();

    const noteDeleted = await this.noteRepository.delete(note_id);

    return noteDeleted;
  }
}
