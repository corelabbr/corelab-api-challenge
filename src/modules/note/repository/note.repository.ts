import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsOrder, In, Repository } from 'typeorm';
import { Note } from '../entity/note.entity';

@Injectable()
export class UserRepository extends Repository<Note> {
  constructor(private dataSource: DataSource) {
    super(Note, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<Note | null> {
    return this.findOne({ where: { id_note: id } });
  }
}