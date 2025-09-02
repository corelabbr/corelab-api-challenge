import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { FindNoteByIdResponseDto } from '../../domain/dtos/requests/FindNote.request.dto';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { NoteRepository } from '../db/repositories/note.repository';

export class FindNoteByIdUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private noteRepository: NoteRepository,
  ) {}

  async execute(
    cuid: string,
    user_id: string,
  ): Promise<
    FindNoteByIdResponseDto | NoteNotFoundException | UnauthorizedException
  > {
    const note = await this.noteRepository.findById(cuid);

    if (!note) {
      throw new NoteNotFoundException();
    }

    if (note.user_id !== user_id) {
      throw new UnauthorizedException();
    }

    return {
      id_note: note.id_note,
      note_title: note.note_title,
      note_color: note.note_color,
      note_text: note.note_text,
      starred: note.starred,
      user_id: note.user_id,
      created_at: note.created_at,
      updated_at: note.updated_at,
    } as FindNoteByIdResponseDto;
  }
}
