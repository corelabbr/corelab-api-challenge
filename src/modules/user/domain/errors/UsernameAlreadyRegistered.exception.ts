import { HttpException } from '@nestjs/common';

export class UsernameAlreadyRegisteredException extends HttpException {
  constructor() {
    super('Este nick já está associado a uma conta.', 403);
  }
}
