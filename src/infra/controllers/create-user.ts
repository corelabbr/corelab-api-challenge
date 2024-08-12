import CreateUserUseCase from "../../application/usecases/users/create/create-user";
import { UsersRepository } from "../../domain/repository/users-repository";
import Controller from "./controller";

export default class CreateUserHandler extends Controller {
  constructor(private readonly usersRepository: UsersRepository) {
    super()
  }

  async execute(): Promise<any> {
    const createNoteUseCase = new CreateUserUseCase(this.usersRepository);
    return await createNoteUseCase.execute(null);
  }
}