import { User } from '@domain/entities/user.entity';
import { IUser } from './user.interface';

export interface IUsersRepository {
  save(user: IUser): Promise<User>;
  findById(id: number): Promise<User>;
  findByUsername(username: string): Promise<User>;
}
