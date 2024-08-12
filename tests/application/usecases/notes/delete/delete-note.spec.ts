import DeleteNoteUseCase from '../../../../../src/application/usecases/notes/delete/delete-note';
import { NotesRepository } from '../../../../../src/domain/repository/notes-repository';
import { UsersRepository } from '../../../../../src/domain/repository/users-repository';
import DeleteNoteInput from '../../../../../src/application/usecases/notes/delete/delete-note-input';

describe('DeleteNoteUseCase', () => {
  let deleteNoteUseCase: DeleteNoteUseCase;
  let notesRepository: NotesRepository;
  let usersRepository: UsersRepository;

  beforeEach(() => {
    notesRepository = {
      get: jest.fn(),
      delete: jest.fn(),
    } as unknown as NotesRepository;
    usersRepository = {
      findUserById: jest.fn(),
    } as unknown as UsersRepository;
    deleteNoteUseCase = new DeleteNoteUseCase(notesRepository, usersRepository);
  });

  it('should delete a note', async () => {
    const userId = 'user-id';
    const noteId = 'note-id';
    const user = { getId: jest.fn() };
    const note = { getId: jest.fn() };

    (usersRepository.findUserById as jest.Mock).mockResolvedValue(user);
    (notesRepository.get as jest.Mock).mockResolvedValue(note);

    await deleteNoteUseCase.execute(new DeleteNoteInput(noteId,userId));

    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.get).toHaveBeenCalledWith(noteId, user.getId());
    expect(notesRepository.delete).toHaveBeenCalledWith(note);
  });

  it('should throw an error if user is not found', async () => {
    const userId = 'user-id';
    const noteId = 'note-id';

    (usersRepository.findUserById as jest.Mock).mockResolvedValue(null);

    await expect(deleteNoteUseCase.execute({ userId, noteId })).rejects.toThrow('User not found!');
    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.get).not.toHaveBeenCalled();
    expect(notesRepository.delete).not.toHaveBeenCalled();
  });

  it('should throw an error if note is not found', async () => {
    const userId = 'user-id';
    const noteId = 'note-id';
    const user = { getId: jest.fn() };

    (usersRepository.findUserById as jest.Mock).mockResolvedValue(user);
    (notesRepository.get as jest.Mock).mockResolvedValue(null);

    await expect(deleteNoteUseCase.execute({ userId, noteId })).rejects.toThrow('Note not found!');
    expect(usersRepository.findUserById).toHaveBeenCalledWith(userId);
    expect(notesRepository.get).toHaveBeenCalledWith(noteId, user.getId());
    expect(notesRepository.delete).not.toHaveBeenCalled();
  });
});