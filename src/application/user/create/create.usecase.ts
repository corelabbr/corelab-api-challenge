import { User } from '@domain/entities/user.entity';
import { IUser } from '@domain/interfaces/user.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';

export class CreateUserUseCase {
  constructor(private userRepo: IUsersRepository) {}

  async execute(user: IUser): Promise<IUser> {
    const newUser = new User(user);
    return this.userRepo.save(newUser);
  }
}
