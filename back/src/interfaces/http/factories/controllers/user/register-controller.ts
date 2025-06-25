import { AuthService } from "@infrastructure/jwt/auth-service";
import { PrismaUserRepository } from "@infrastructure/repositories/user-repositories";
import { RegisterController } from "@interfaces/controllers/user/register-controller";
import { CreateUseCase } from "@usecases/user/create-use-case";

export const makeRegisterController = () => {
  const userRepository = new PrismaUserRepository();
  const createUseCase = new CreateUseCase(userRepository);
  const authService = new AuthService();
  return new RegisterController(createUseCase, authService);
}