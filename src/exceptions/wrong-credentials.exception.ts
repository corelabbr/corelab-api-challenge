// wrong-credentials.exception.ts

import { HttpException, HttpStatus } from '@nestjs/common';

export class WrongCredentialsException extends HttpException {
  constructor() {
    super('E-mail ou palavra-passe incorreta', HttpStatus.UNAUTHORIZED);
  }
}
