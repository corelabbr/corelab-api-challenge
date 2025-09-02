import { UnauthorizedException } from '@nestjs/common';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { DeleteNoteUsecase } from './delete-note.usecase';
import { faker } from '@faker-js/faker';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { EditNoteResponseDTO } from '../../domain/dtos/requests/EditNote.request.dto';

describe('Delete Note Usecase Test Suites', () => {
  let useCase: DeleteNoteUsecase;
  let encrypterProvider: EncrypterProvider;
  let mockUserRepository: UserRepository;
  let mockNoteRepository: NoteRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(async () => {
    encrypterProvider = new EncrypterProvider();
    hashProvider = new HashProvider();
    mockUserRepository = new UserRepository(hashProvider, encrypterProvider);
    mockNoteRepository = new NoteRepository(encrypterProvider);
    useCase = new DeleteNoteUsecase(mockUserRepository, mockNoteRepository);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const note_id = faker.string.uuid();

  const user_id = faker.string.uuid();

  const mockNote: EditNoteResponseDTO = {
    id_note: note_id,
    note_title: faker.string.alpha(10),
    note_text: faker.string.alpha(10),
    note_color: 'blue',
    starred: false,
    user_id: user_id,
    created_at: new Date(),
    updated_at: new Date(),
  };

  describe('\nUnsuccessful Cases', () => {
    describe('\nUnauthorized Cases', () => {
      it('should throw UserNotFoundException if the user does not exist', async () => {
        jest.spyOn(mockUserRepository, 'findById').mockResolvedValueOnce(null);

        await expect(useCase.execute(note_id, user_id)).rejects.toThrow(
          UserNotFoundException,
        );
      });

      it('should throw NoteNotFoundException if the note does not exist', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest.spyOn(mockNoteRepository, 'findById').mockResolvedValueOnce(null);

        await expect(useCase.execute(note_id, user_id)).rejects.toThrow(
          NoteNotFoundException,
        );
      });

      it('should throw UnauthorizedException if the note does not belong to the user', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest
          .spyOn(mockNoteRepository, 'findById')
          .mockResolvedValueOnce({ user_id: faker.string.uuid() } as any);

        await expect(useCase.execute(note_id, user_id)).rejects.toThrow(
          UnauthorizedException,
        );
      });
    });
  });

  describe('\nSuccessful Cases', () => {
    it('should return true when a note is successfully deleted', async () => {
      jest
        .spyOn(mockNoteRepository, 'findById')
        .mockResolvedValueOnce(mockNote);
      jest
        .spyOn(mockUserRepository, 'findById')
        .mockResolvedValueOnce({} as any);
      jest.spyOn(mockNoteRepository, 'delete').mockResolvedValueOnce(true);

      mockNote.user_id = user_id;

      const result = await useCase.execute(note_id, user_id);

      expect(result).toBe(true);
    });
  });
});
