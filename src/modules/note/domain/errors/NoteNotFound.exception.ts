import { HttpException } from '@nestjs/common';

export class NoteNotFoundException extends HttpException {
  constructor() {
    super('Nota não encontrada.', 404);
  }
}
