import { User } from '@domain/entities/user.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';

export class FindOneUserUseCase {
  constructor(private userRepo: IUsersRepository) {}

  async findById(id: number): Promise<User> {
    return this.userRepo.findById(id);
  }

  async findByUsername(username: string): Promise<User> {
    return this.userRepo.findByUsername(username);
  }
}
