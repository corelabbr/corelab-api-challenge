import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import {
  CreateNoteBodyDTO,
  CreateNoteResponseDTO,
} from '../../domain/dtos/requests/CreateNote.request.dto';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';

export class CreateNoteUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly noteRepository: NoteRepository,
  ) {}

  async execute(
    data: CreateNoteBodyDTO,
    user_id: string,
  ): Promise<
    CreateNoteResponseDTO | UnauthorizedException | UnprocessableDataException
  > {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) throw new UserNotFoundException();

    const note = await this.noteRepository.create(user_id, {
      note_color: data.note_color,
      note_text: data.note_text,
      note_title: data.note_title,
      starred: data.starred,
    });

    return {
      id_note: note.id_note,
      note_color: note.note_color,
      note_text: note.note_text,
      user_id: note.user_id,
      note_title: note.note_title,
      starred: note.starred,
      created_at: note.created_at,
      updated_at: note.updated_at,
    } as CreateNoteResponseDTO;
  }
}
