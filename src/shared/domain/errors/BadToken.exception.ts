import { HttpException } from '@nestjs/common';

export class BadTokenEception extends HttpException {
  constructor() {
    super('Token inválido ou expirado.', 401);
  }
}
