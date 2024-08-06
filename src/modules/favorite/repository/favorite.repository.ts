import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsOrder, In, Repository } from 'typeorm';
import { Favorite } from '../entity/favorite.entity';

@Injectable()
export class FavoriteRepository extends Repository<Favorite> {
  constructor(private dataSource: DataSource) {
    super(Favorite, dataSource.createEntityManager());
  }

  /* This method shall bring all the fav notes that belong to the user */
  async findUserFavoriteNotes(user_id: number): Promise<Favorite[]> {
    return this.find({ where: { user_id } });
  }

  /* This method shall bring a single note by its note_id and user_id */
  async findFavoriteNote(
    user_id: number,
    note_id: number,
  ): Promise<Favorite | null> {
    return this.findOne({ where: { user_id, note_id } });
  }
}
