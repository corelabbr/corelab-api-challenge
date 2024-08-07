import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repository/note.repository';
import { FindNotesResponseDTO } from '../domain/requests/FindNotes.request.dto';
import { FavoriteRepository } from '../../favorite/repository/favorite.repository';

@Injectable()
export class NoteService {
    constructor(
        private readonly noteRepository: NoteRepository,
        private readonly favoriteRepository: FavoriteRepository,
      ) {}
    
    /* This method shall bring 20 of the user's notes per use */
    async getNotes(user_id: number, skip: number): Promise<FindNotesResponseDTO[]> {
      const notes = await this.noteRepository.find({
        order: { created_at: 'DESC' },
        take: 20,
        skip,
        where: { user_id },
      })

      const favoriteNoteIds = await this.favoriteRepository.find({
        where: { user_id },
      }).then((favorites) => favorites.map((favorite) => favorite.note_id));

        return notes.map((note) => ({
            ...note,
            is_favorite: favoriteNoteIds.includes(note.id_note),
        }));
    }
}
