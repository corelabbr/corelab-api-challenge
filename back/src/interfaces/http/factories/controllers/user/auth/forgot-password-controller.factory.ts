import { PrismaUserRepository } from "@infrastructure/repositories/user-repositories";
import { NodemailerService } from "@infrastructure/services/NodemailerService";
import { ForgotPasswordController } from "@interfaces/controllers/user/auth/forgot-password-controller";
import { ForgotPasswordUseCase } from "@usecases/user/auth/ForgotPasswordUseCase";

export function makeForgotPasswordController() {
  const userRepo = new PrismaUserRepository();
  const mailer = new NodemailerService();
  const useCase = new ForgotPasswordUseCase(userRepo, mailer);
  return new ForgotPasswordController(useCase);
}