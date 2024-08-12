import ApiError from '../../../../domain/error/error';
import { NotesRepository } from '../../../../domain/repository/notes-repository';
import { UsersRepository } from '../../../../domain/repository/users-repository';
import { UseCase } from '../../usecase';
import DeleteNoteInput from './delete-note-input';

export default class DeleteNoteUseCase implements UseCase<DeleteNoteInput, void>{
  constructor(
    private readonly notesRepository: NotesRepository, 
    private readonly usersRepository: UsersRepository
  ) {}
  async execute(data: DeleteNoteInput): Promise<void> {
    const user = await this.usersRepository.findUserById(data.userId);
    if (!user) throw new ApiError(404, 'User not found');
    const note = await this.notesRepository.get(data.noteId, user.getId());
    if (!note) throw new ApiError(404, 'Note not found');
    try {
      await this.notesRepository.delete(note);      
    } catch (error) {
      throw new ApiError(400, 'Note not deleted');      
    }
  }
}
