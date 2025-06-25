import nodemailer from "nodemailer";
import { IMailerService } from "@domain/services/mailer-service";
import SMTPTransport from "nodemailer/lib/smtp-transport";

require('dotenv').config({ path: '.env' });

export class NodemailerService implements IMailerService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    } as SMTPTransport.Options);
  }

  async sendMail({ to, subject, html }: { to: string; subject: string; html: string; }): Promise<void> {
    await this.transporter.sendMail({
      from: process.env.USER,
      to,
      subject,
      html,
    });
  }
}
