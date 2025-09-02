import { HttpException } from '@nestjs/common';

export class ColorAlreadySetException extends HttpException {
  constructor() {
    super('A nota já está com esta cor inserida.', 400);
  }
}
