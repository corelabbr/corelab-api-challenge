export interface IMailerService {
  sendMail(params: { to: string; subject: string; html: string }): Promise<void>;
}