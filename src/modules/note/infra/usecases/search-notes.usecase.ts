import { Inject } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { NoteRepository } from '../db/repositories/note.repository';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { BrowseNotesResponseDto } from '../../domain/dtos/requests/FindNote.request.dto';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';

export class SearchNotesUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private noteRepository: NoteRepository,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(
    cuid: string,
    content: string,
  ): Promise<BrowseNotesResponseDto | UserNotFoundException> {
    const user = await this.userRepository.findById(cuid);

    if (!user) {
      throw new UserNotFoundException();
    }

    const notes = await this.noteRepository.search(cuid, content);

    return notes;
  }
}
