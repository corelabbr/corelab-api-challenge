import { authLoginDoc } from "./user/login.doc";
import { authRegisterDoc } from "./user/register.doc";
import { taskDoc } from "./task/task-doc.doc";
import { taskUpdateDoc } from "./task/task-update.doc";
import { forgotPasswordDoc } from "./user/auth/forgot-password.doc";
import { resetPasswordDoc } from "./user/auth/reset-password.doc";

export const swaggerPaths = {
    ...authRegisterDoc,
    ...authLoginDoc,
    ...taskDoc,
    ...taskUpdateDoc,
    ...forgotPasswordDoc,
    ...resetPasswordDoc
};