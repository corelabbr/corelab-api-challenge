import { Request, Response } from "express";
import { ResetPasswordUseCase } from "@usecases/user/auth/ResetPasswordUseCase";

export class ResetPasswordController {
  constructor(private resetPasswordUseCase: ResetPasswordUseCase) {}

  async resetPassword(req: Request, res: Response) {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token e nova senha são obrigatórios!" });
    }

    try {
      await this.resetPasswordUseCase.execute(token, newPassword);
      return res.json({ message: "Senha redefinida com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}