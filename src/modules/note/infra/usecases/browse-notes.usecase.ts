import { Inject } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { BrowseNotesResponseDto } from '../../domain/dtos/requests/FindNote.request.dto';
import { NoteRepository } from '../db/repositories/note.repository';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';

export class BrowseNotesUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private noteRepository: NoteRepository,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(
    cuid: string,
  ): Promise<BrowseNotesResponseDto | UserNotFoundException> {
    const user = await this.userRepository.findById(cuid);

    if (!user) {
      throw new UserNotFoundException();
    }

    const notes = await this.noteRepository.findByUser(cuid);

    return notes;
  }
}
