import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repository/favorite.repository';
import { NoteIsAlreadyFavoritedException } from '../domain/errors/NoteIsAlreadyFavorited.exception';
import { NoteRepository } from '../../note/repository/note.repository';
import { NoteNotFoundException } from '../../note/domain/errors/NoteNotFound.exception';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly noteRepository: NoteRepository,
  ) {}

  /* This method shall mark a note as favorite if it has not been already marked */
  async markAsFavorite(
    user_id: number,
    note_id: number,
  ): Promise<void | NoteNotFoundException | NoteIsAlreadyFavoritedException> {
    await this.noteRepository.findById(note_id).then((note) => {
      if (!note) throw new NoteNotFoundException();
    });

    const favorite = await this.favoriteRepository.findFavoriteNote(
      user_id,
      note_id,
    );

    if (favorite) throw new NoteIsAlreadyFavoritedException();

    await this.favoriteRepository.markAsFavorite(user_id, note_id);
  }

  /* This method shall unmark a note as favorite */
  async unmarkAsFavorite(
    user_id: number,
    note_id: number,
  ): Promise<void | NoteNotFoundException> {
    await this.noteRepository.findById(note_id).then((note) => {
      if (!note) throw new NoteNotFoundException();
    });

    await this.favoriteRepository.unmarkAsFavorite(user_id, note_id);
  }
}
