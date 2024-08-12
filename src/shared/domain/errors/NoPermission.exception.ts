import { HttpException } from '@nestjs/common';

export class NoPermisionException extends HttpException {
  constructor() {
    super('Você não tem permissão para utilizar esse recurso.', 401);
  }
}
