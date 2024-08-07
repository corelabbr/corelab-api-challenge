import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from '../repository/favorite.repository';
import { NoteIsAlreadyFavoritedException } from '../domain/errors/NoteIsAlreadyFavorited.exception';

@Injectable()
export class FavoriteService {
  constructor(private readonly favoriteRepository: FavoriteRepository) {}

  /* This method shall mark a note as favorite if it has not been already marked */
  async markAsFavorite(user_id: number, note_id: number): Promise<void> {
    const favorite = await this.favoriteRepository.findFavoriteNote(
      user_id,
      note_id,
    );

    if (favorite) throw new NoteIsAlreadyFavoritedException();

    await this.favoriteRepository.markAsFavorite(user_id, note_id);
  }

  /* This method shall unmark a note as favorite */
  async unmarkAsFavorite(user_id: number, note_id: number): Promise<void> {
    await this.favoriteRepository.unmarkAsFavorite(user_id, note_id);
  }
}
