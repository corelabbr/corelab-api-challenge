import { HttpException } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  constructor() {
    super('Usuário não encontrado.', 404);
  }
}
