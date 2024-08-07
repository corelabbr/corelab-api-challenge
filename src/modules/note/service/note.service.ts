import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repository/note.repository';
import { FindNoteResponseDTO } from '../domain/requests/FindNotes.request.dto';
import { FavoriteRepository } from '../../favorite/repository/favorite.repository';
import {
  CreateNoteRequestDTO,
  CreateNoteResponseDTO,
} from '../domain/requests/CreateNote.request.dto';
import { UserNotFoundException } from '../../user/domain/errors/UserNotFound.exception';
import { UserRepository } from '../../user/repository/user.repository';
import {
  EditNoteRequestDTO,
  EditNoteResponseDTO,
} from '../domain/requests/EditNote.request.dto';
import { UnprocessableDataException } from '../../../shared/domain/errors/UnprocessableData.exception';
import { NoteNotFoundException } from '../domain/errors/NoteNotFound.exception';

@Injectable()
export class NoteService {
  constructor(
    private readonly noteRepository: NoteRepository,
    private readonly favoriteRepository: FavoriteRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /* This method shall bring 20 of the user's notes per use */
  async getNotes(
    user_id: number,
    skip: number,
  ): Promise<FindNoteResponseDTO[]> {
    const notes = await this.noteRepository.find({
      order: { created_at: 'DESC' },
      take: 20,
      skip,
      where: { user_id },
    });

    const favoriteNoteIds = await this.favoriteRepository
      .find({
        where: { user_id },
      })
      .then((favorites) => favorites.map((favorite) => favorite.note_id));

    return notes.map((note) => ({
      ...note,
      is_favorite: favoriteNoteIds.includes(note.id_note),
    }));
  }

  /* This method shall bring a single note by its id */
  async getNoteById(
    user_id: number,
    note_id: number,
  ): Promise<
    FindNoteResponseDTO | NoteNotFoundException | UserNotFoundException
  > {
    await this.userRepository.findById(user_id).then((user) => {
      if (!user) throw new UserNotFoundException();
    });

    const note = await this.noteRepository.findById(note_id);

    if (!note) throw new NoteNotFoundException();

    const favorite = await this.favoriteRepository.find({
      where: { user_id, note_id },
    });

    return {
      ...note,
      favorite: favorite.length > 0,
    };
  }

  /* This method shall create a new note given the valid data */
  async createNote(
    user_id: number,
    data: CreateNoteRequestDTO,
  ): Promise<
    CreateNoteResponseDTO | UnprocessableDataException | UserNotFoundException
  > {
    await this.userRepository.findById(user_id).then((user) => {
      if (!user) throw new UserNotFoundException();
    });

    const note = await this.noteRepository.save({
      ...data,
      user_id,
    });

    return {
      id: note.id_note,
      title: note.title,
      note_text: note.note_text,
      color: note.color,
      created_at: note.created_at,
      updated_at: note.updated_at,
    };
  }

  /* This method shall edit a note's data */
  async editNote(
    user_id: number,
    note_id: number,
    data: EditNoteRequestDTO,
  ): Promise<
    | EditNoteResponseDTO
    | NoteNotFoundException
    | UnprocessableDataException
    | UserNotFoundException
  > {
    await this.userRepository.findById(user_id).then((user) => {
      if (!user) throw new UserNotFoundException();
    });

    const note = await this.noteRepository.findById(note_id);

    if (!note) throw new NoteNotFoundException();

    note.title = data.title;
    note.note_text = data.note_text;
    note.color = data.color;

    await this.noteRepository.save(note);

    return {
      id: note.id_note,
      title: note.title,
      note_text: note.note_text,
      color: note.color,
      created_at: note.created_at,
      updated_at: note.updated_at,
    };
  }

  /* This method shall soft delete a note */
  async deleteNote(
    user_id: number,
    note_id: number,
  ): Promise<true | NoteNotFoundException | UserNotFoundException> {
    await this.userRepository.findById(user_id).then((user) => {
      if (!user) throw new UserNotFoundException();
    });

    const note = await this.noteRepository.findById(note_id);

    if (!note) throw new NoteNotFoundException();

    await this.noteRepository.softDeleteById(note_id);

    return true;
  }
}
