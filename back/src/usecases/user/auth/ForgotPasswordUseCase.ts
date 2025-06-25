import { IUserRepository } from "@domain/repositories/user-repository";
import { IMailerService } from "@domain/services/mailer-service";
import crypto from "crypto";
require('dotenv').config({ path: '.env' });

const PORT_FRONT = process.env.PORT_FRONT || 3001;

export class ForgotPasswordUseCase {
  constructor(
    private userRepo: IUserRepository,
    private mailer: IMailerService
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("Usuário não encontrado");

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 min

    user.resetToken = token;
    user.tokenExpires = tokenExpires;
    await this.userRepo.save(user);
    
    const resetLink = `http://localhost:${PORT_FRONT}/reset-password/${token}`;
    
    await this.mailer.sendMail({
      to: email,
      subject: "Recuperação de senha",
      html: this.email(resetLink) 
    });
  }

  private email(resetLink: string): string {
    return `
      <p>Olá,</p>
      <p>Você solicitou a recuperação de senha. Clique no link abaixo para redefinir sua senha:</p>
      <p><a href="${resetLink}">Redefinir senha</a></p>
      <p>Se você não solicitou essa alteração, ignore este e-mail.</p>
    `;
  }
}
