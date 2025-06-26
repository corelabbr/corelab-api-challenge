import { makeCreateController } from "./controllers/task/create-controller";
import { makeDeleteTaskController } from "./controllers/task/delete-task-controller";
import { makeReadController } from "./controllers/task/read-controller";
import { makeUpdateTaskController } from "./controllers/task/update-task-controller";
import { makeForgotPasswordController } from "./controllers/user/auth/forgot-password-controller.factory";
import { makeResetPasswordController } from "./controllers/user/auth/reset-password-controller.factory";
import { makeLoginController } from "./controllers/user/login-controller";
import { makeRegisterController } from "./controllers/user/register-controller";


export const factories = {
  // Controllers
  makeResetPasswordController,
  makeForgotPasswordController,
  makeRegisterController,
  makeLoginController,
  makeCreateController,
  makeUpdateTaskController,
  makeReadController,
  makeDeleteTaskController
}