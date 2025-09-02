import { HttpException } from '@nestjs/common';

export class NotAuthenticatedException extends HttpException {
  constructor() {
    super('Você precisa estar logado para acessar este recurso.', 401);
  }
}
