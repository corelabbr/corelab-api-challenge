import { User } from '@prisma/client';
import { CreateUserBodyDTO } from '../requests/CreateUser.request.dto';

export interface UserRepositoryInterface {
  encryptedFields: (keyof User)[];
  findById(id: string): Promise<Partial<User> | null>;
  findByEmail(email: string): Promise<Partial<User> | null>;
  setPassword(id: string, password: string): Promise<Partial<User> | null>;
  create(data: CreateUserBodyDTO): Promise<User>;
  comparePassword(
    userId: string,
    givenPassword: string,
  ): Promise<boolean | null>;
}
