import { Note } from '@prisma/client';
import {
  CreateNoteBodyDTO,
  CreateNoteResponseDTO,
} from '../requests/CreateNote.request.dto';
import {
  BrowseNotesResponseDto,
  FindNoteByIdResponseDto,
} from '../requests/FindNote.request.dto';

export interface NoteRepositoryInterface {
  encryptedFields: (keyof Note)[];
  search(id_user: string, content: string): Promise<BrowseNotesResponseDto>;
  findById(id_user: string): Promise<FindNoteByIdResponseDto | null>;
  findByUser(id_user: string): Promise<FindNoteByIdResponseDto[]>;
  create(
    user_id: string,
    data: CreateNoteBodyDTO,
  ): Promise<CreateNoteResponseDTO>;
  star(id_note: string): Promise<Note | null>;
  changeColor(
    id_note: string,
    color: 'red' | 'green' | 'blue' | 'yellow',
  ): Promise<Note | null>;
  edit(id_note: string, data: Partial<CreateNoteBodyDTO>): Promise<Note | null>;
  delete(id_note: string): Promise<boolean>;
}
