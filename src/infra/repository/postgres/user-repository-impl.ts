import { UsersRepository } from "../../../domain/repository/users-repository";
import User from "../../../domain/entity/user";
import { Connection } from "@/infra/database/connection";

export default class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly db: Connection) { }

  async findUserById(id: string): Promise<User | null> {
    try {
      const result = await this.db.query('SELECT * FROM public.users WHERE id = $1', [id]);
      const user = User.fromUser(result[0].id);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  async createUser(user: User): Promise<User> {
    const query = `INSERT INTO USERS(id) values($1)`;
    try {
      await this.db.query(query, [user.getId()]);
      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Error creating user");
    }
  }
}
