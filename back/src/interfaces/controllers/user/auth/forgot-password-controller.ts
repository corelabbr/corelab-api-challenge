import { Request, Response } from "express";
import { ForgotPasswordUseCase } from "@usecases/user/auth/ForgotPasswordUseCase";

export class ForgotPasswordController {
  constructor(private forgotPasswordUseCase: ForgotPasswordUseCase) {}

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email é obrigatório!" });
    }

    try {
      await this.forgotPasswordUseCase.execute(email);
      return res.json({ message: "E-mail enviado" });
    } catch (error: any) {
      return res.status(500).json({ message: "Internal server error", error: error.message });
    }
  }
}
