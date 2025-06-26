import { PrismaUserRepository } from "@infrastructure/repositories/user-repositories";
import { ResetPasswordController } from "@interfaces/controllers/user/auth/reset-password-controller";
import { ResetPasswordUseCase } from "@usecases/user/auth/ResetPasswordUseCase";


export function makeResetPasswordController() {
  const userRepo = new PrismaUserRepository();
  const useCase = new ResetPasswordUseCase(userRepo);
  return new ResetPasswordController(useCase);
}