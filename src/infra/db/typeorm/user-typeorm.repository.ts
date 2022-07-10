import { User } from '@domain/entities/user.entity';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { IUser } from '@domain/interfaces/user.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';
import { Repository } from 'typeorm';
import { UserEntityTypeorm } from './user.schema';

export class UserTypeormRepository implements IUsersRepository {
  constructor(private readonly ormRepo: Repository<UserEntityTypeorm>) {}

  async save(user: IUser): Promise<User> {
    const newUser = this.ormRepo.create(user);
    await this.ormRepo.save(newUser);

    return newUser;
  }

  async findById(id: number): Promise<User> {
    return this.ormRepo.findOne({
      where: { id },
      relations: ['vehicles', 'favorites'],
    });
  }

  async findByUsername(username: string): Promise<User> {
    return this.ormRepo.findOne({ where: { username } });
  }
}
