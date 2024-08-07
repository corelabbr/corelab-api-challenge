import { HttpException } from '@nestjs/common';

export class NoteIsAlreadyFavoritedException extends HttpException {
  constructor() {
    super('Este item já está favoritado.', 403);
  }
}
