import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsOrder, In, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findById(id: number): Promise<User | null> {
    return this.findOne({ where: { id_user: id } });
  }

  
}
