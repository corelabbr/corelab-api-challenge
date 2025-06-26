import { HomeController } from "./home-controller";
import { CreateTaskController } from "./task/create-controller";
import { ReadAllTaskController } from "./task/read-controller";
import { UpdateTaskController } from "./task/update-task-controller";
import { ForgotPasswordController } from "./user/auth/forgot-password-controller";
import { ResetPasswordController } from "./user/auth/reset-password-controller";
import { LoginController } from "./user/login-controller";
import { RegisterController } from "./user/register-controller";

export class Controllers {
    static homeController = HomeController;
    static registerController = RegisterController;
    static loginController = LoginController;
    static createTaskController = CreateTaskController;
    static readAllTaskController = ReadAllTaskController;
    static updateTaskController = UpdateTaskController;
    static forgotPasswordController = ForgotPasswordController;
    static resetPasswordController = ResetPasswordController;
}