import { HttpException } from '@nestjs/common';

export class UnprocessableDataException extends HttpException {
  constructor(message?: string) {
    super(`Erro de validação de dados. ${message ?? ''}`, 422);
  }
}
