import ApiError from '../../../../domain/error/error';
import User from "../../../../domain/entity/user";
import { UsersRepository } from "../../../../domain/repository/users-repository";
import { UseCase } from "../../usecase";
import CreateUserOutput from "./create-user-output";

export default class CreateUserUseCase implements UseCase<null, CreateUserOutput> {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {}
  async execute(data: null): Promise<CreateUserOutput> {
    const newUser = User.newUser();
    try {
      const user = await this.usersRepository.createUser(newUser);
      const output = new CreateUserOutput(user.getId());
      return output      
    } catch (error) {
      throw new ApiError(400, "User not created");
      
    }
  }
}
