import { Injectable } from '@nestjs/common';
import { DataSource, FindOptionsOrder, In, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  /* This method shall find the data of a single user by its id_user key */
  async findById(id: number): Promise<User | null> {
    return this.findOne({ where: { id_user: id } });
  }

  /* This method shall find the data of a single user by its username */
  async findByUsername(username: string, id?: number): Promise<User | null> {
    return this.findOne({
      where: { username, id_user: id },
    });
  }

  /* This method shall find the data of a single user by its email, so it can be used on the authentication part */
  async findByEmail(email: string, id?: number): Promise<User | null> {
    return this.findOne({ where: { email, id_user: id } });
  }

  /* This method will make a soft delete on the user of the given id */
  async softDeleteById(id: number): Promise<true> {
    await this.softDelete(id);
    return;
  }
}
