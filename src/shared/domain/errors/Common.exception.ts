import { HttpException } from '@nestjs/common';

export class CommonException extends HttpException {
  constructor(message?: string) {
    super(`Ocorreu um erro. ${message ?? ''}`, 500);
  }
}
