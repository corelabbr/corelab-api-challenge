import { PrismaUserRepository } from "@infrastructure/repositories/user-repositories";
import { LoginController } from "@interfaces/controllers/user/login-controller";
import { LoginUseCase } from "@usecases/user/login-use-case";


export const makeLoginController = () => {
  const userRepository = new PrismaUserRepository();
  const loginUseCase = new LoginUseCase(userRepository);
  return new LoginController(loginUseCase);
}