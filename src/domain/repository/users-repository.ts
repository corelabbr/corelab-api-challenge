import User from "../entity/user";

export interface UsersRepository {
  findUserById(id: string): Promise<User | null>;
  createUser(user: User): Promise<User>;
}