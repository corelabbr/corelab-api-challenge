import { User } from '@domain/entities/user.entity';
import { IUser } from '@domain/interfaces/user.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';

export class UserInMemoryRepository implements IUsersRepository {
  users: IUser[] = [];

  async findById(id: number): Promise<User> {
    return this.users.find((user) => user.id === id) as User;
  }

  async findByUsername(username: string): Promise<User> {
    return this.users.find((user) => user.username === username) as User;
  }

  async save(user: IUser): Promise<User> {
    user.id = this.users.length + 1;
    this.users.push(user);
    return user as User;
  }
}
