import { Injectable } from '@nestjs/common';
import { prisma } from '../../../../../shared/infra/db/prisma';
import { EncrypterProvider } from '../../../../../shared/infra/providers/Encrypter.provider';
import { NoteRepositoryInterface } from '../../../domain/dtos/repositories/Note.repository';
import { Note } from '@prisma/client';
import {
  BrowseNotesResponseDto,
  FindNoteByIdResponseDto,
} from '../../../domain/dtos/requests/FindNote.request.dto';
import {
  CreateNoteBodyDTO,
  CreateNoteResponseDTO,
} from '../../../domain/dtos/requests/CreateNote.request.dto';

@Injectable()
export class NoteRepository implements NoteRepositoryInterface {
  public encryptedFields: (keyof Note)[] = ['note_title', 'note_text'];

  constructor(private encrypterProvider: EncrypterProvider) {}

  /* This method will be used to search for notes containing the content on its text or title */
  async search(
    id_user: string,
    content: string,
  ): Promise<BrowseNotesResponseDto> {
    const userNotes = await this.findByUser(id_user);

    const filteredNotes = userNotes.filter((note) => {
      return (
        note.note_title.includes(content) || note.note_text.includes(content)
      );
    });

    return filteredNotes;
  }

  /* This method will be used to find a single Note by its id */
  async findById(id: string): Promise<FindNoteByIdResponseDto | null> {
    const note = await prisma.note.findUnique({
      where: { id_note: id, deletedAt: null },
    });

    if (!note) {
      return null;
    }

    const decryptedNote = this.encrypterProvider.decryptData(
      note,
      this.encryptedFields as (keyof typeof note)[],
    );

    return {
      id_note: decryptedNote.id_note,
      note_title: decryptedNote.note_title,
      note_text: decryptedNote.note_text,
      note_color: decryptedNote.note_color,
      user_id: decryptedNote.user_id,
      starred: decryptedNote.starred,
      updated_at: decryptedNote.updatedAt,
      created_at: decryptedNote.createdAt,
    } as FindNoteByIdResponseDto;
  }

  /* This method will be used to find all Notes by a user */
  async findByUser(id_user: string): Promise<BrowseNotesResponseDto> {
    const notes = await prisma.note.findMany({
      where: { user_id: id_user, deletedAt: null },
    });

    if (!notes) {
      return [];
    }

    return notes.map((note) => {
      const decryptedNote = this.encrypterProvider.decryptData(
        note,
        this.encryptedFields as (keyof typeof note)[],
      );

      return {
        id_note: decryptedNote.id_note,
        note_title: decryptedNote.note_title,
        note_text: decryptedNote.note_text,
        note_color: decryptedNote.note_color,
        user_id: decryptedNote.user_id,
        starred: decryptedNote.starred,
        created_at: decryptedNote.createdAt,
        updated_at: decryptedNote.updatedAt,
      };
    });
  }

  /* This method will be used to create a new note for an user */
  async create(
    user_id: string,
    data: CreateNoteBodyDTO,
  ): Promise<CreateNoteResponseDTO> {
    const note = await prisma.note.create({
      data: {
        note_color: data.note_color,
        note_title: this.encrypterProvider.encrypt({
          content: data.note_title,
        }),
        note_text: this.encrypterProvider.encrypt({ content: data.note_text }),
        user_id: user_id,
        starred: data.starred,
      },
    });

    return {
      id_note: note.id_note,
      note_color: note.note_color,
      note_title: note.note_title,
      note_text: note.note_text,
      user_id: note.user_id,
      starred: note.starred,
      updated_at: note.updatedAt,
      created_at: note.createdAt,
    } as CreateNoteResponseDTO;
  }

  /* Starring or removing the star of a note */
  async star(id_note: string): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: { id_note, deletedAt: null },
    });

    if (!note) {
      return null;
    }

    const updatedNote = await prisma.note.update({
      where: { id_note },
      data: { starred: !note.starred },
    });

    const decryptedNote = this.encrypterProvider.decryptData(
      updatedNote,
      this.encryptedFields as (keyof typeof updatedNote)[],
    );

    return decryptedNote;
  }

  /* Changing a note's color */
  async changeColor(
    id_note: string,
    color: 'red' | 'green' | 'blue' | 'yellow',
  ): Promise<Note | null> {
    const note = await prisma.note.findUnique({
      where: { id_note: id_note, deletedAt: null },
    });

    if (!note) {
      return null;
    }

    const updatedNote = await prisma.note.update({
      where: { id_note, deletedAt: null },
      data: { note_color: color },
    });

    const decryptedNote = this.encrypterProvider.decryptData(
      updatedNote,
      this.encryptedFields as (keyof typeof updatedNote)[],
    );

    return decryptedNote;
  }

  /* This method will create a new note */
  async edit(
    id_note: string,
    data: Partial<CreateNoteBodyDTO>,
  ): Promise<Note | null> {
    const updatedData: Partial<CreateNoteBodyDTO> = { ...data };

    if (data.note_title) {
      updatedData.note_title = this.encrypterProvider.encrypt({
        content: data.note_title,
      });
    }

    if (data.note_text) {
      updatedData.note_text = this.encrypterProvider.encrypt({
        content: data.note_text,
      });
    }

    const note = await prisma.note.update({
      where: { id_note, deletedAt: null },
      data: {
        ...updatedData,
        updatedAt: new Date(),
      },
    });

    return note;
  }

  /* Deleting a Note */
  async delete(id_note: string): Promise<boolean> {
    const note = await prisma.note.update({
      where: { id_note, deletedAt: null },
      data: { deletedAt: new Date() },
    });

    return !!note;
  }
}
