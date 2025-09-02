import { HttpException } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Usuário ou senha inválidos.', 400);
  }
}
