import User from "../../../../src/domain/entity/user";
import { UsersRepository } from "../../../../src/domain/repository/users-repository";
import CreateUserUseCase from "../../../../src/application/usecases/users/create/create-user";
import CreateUserOutput from "../../../../src/application/usecases/users/create/create-user-output";

describe("CreateUserUseCase", () => {
  it("should create a new user successfully", async () => {
    const newUser = User.newUser();
    jest.spyOn(User, "newUser").mockReturnValue(newUser);
    const usersRepository = {
      createUser: jest.fn().mockResolvedValue(newUser),
    } as unknown as UsersRepository;
    
    const createUserUseCase = new CreateUserUseCase(usersRepository);
    const output = await createUserUseCase.execute(null);
    expect(usersRepository.createUser).toHaveBeenCalledWith(newUser);
    expect(usersRepository.createUser).toHaveBeenCalledTimes(1);
    expect(output).toEqual(new CreateUserOutput(newUser.getId()));
  });
});