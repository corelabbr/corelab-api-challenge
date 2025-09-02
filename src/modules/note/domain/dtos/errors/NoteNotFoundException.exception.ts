import { HttpException } from '@nestjs/common';

export class NoteNotFoundException extends HttpException {
  constructor() {
    super('Anotação não encontrada.', 404);
  }
}
