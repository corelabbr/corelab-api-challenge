import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import {
  EditNoteBodyDTO,
  EditNoteResponseDTO,
} from '../../domain/dtos/requests/EditNote.request.dto';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';

export class EditNoteUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository,
    @Inject()
    private readonly noteRepository: NoteRepository,
  ) {}
  async execute(
    note_id: string,
    user_id: string,
    data: EditNoteBodyDTO,
  ): Promise<
    | EditNoteResponseDTO
    | UnauthorizedException
    | UserNotFoundException
    | UnprocessableDataException
  > {
    if (data.note_text.length < 3 || data.note_title.length < 3) {
      throw new UnprocessableDataException();
    }

    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) throw new UserNotFoundException();

    const noteExists = await this.noteRepository.findById(note_id);

    if (!noteExists) throw new NoteNotFoundException();

    if (noteExists.user_id !== user_id) throw new UnauthorizedException();

    const editedNote = await this.noteRepository.edit(note_id, data);

    if (!editedNote) throw new UnprocessableDataException();

    return {
      id_note: editedNote.id_note,
      note_title: editedNote.note_title,
      note_text: editedNote.note_text,
      note_color: editedNote.note_color,
      user_id: editedNote.user_id,
      starred: editedNote.starred,
      updated_at: editedNote.updatedAt,
      created_at: editedNote.createdAt,
    };
  }
}
