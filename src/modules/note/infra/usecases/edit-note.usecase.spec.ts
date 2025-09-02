import { UnauthorizedException } from '@nestjs/common';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { EditNoteBodyDTO } from '../../domain/dtos/requests/EditNote.request.dto';
import { EditNoteUsecase } from './edit-note.usecase';
import { faker } from '@faker-js/faker';
import { NoteRepository } from '../db/repositories/note.repository';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';

describe('Edit Note Use Case Test Suites', () => {
  let useCase: EditNoteUsecase;
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
    useCase = new EditNoteUsecase(mockUserRepository, mockNoteRepository);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const invalidData: EditNoteBodyDTO = {
    note_text: faker.string.alpha(),
    note_title: faker.string.alpha(),
  };

  const noteId = faker.string.uuid();

  const userId = faker.string.uuid();

  describe('\nUnsuccessful cases', () => {
    describe('\nInvalid data insertion', () => {
      it('should not allow short data to be inserted', async () => {
        invalidData.note_text = 'ab';
        invalidData.note_title = 'ab';
        await expect(
          useCase.execute(noteId, userId, invalidData),
        ).rejects.toThrow(UnprocessableDataException);
      });
    });

    describe('\nConflictuous/Unauthorized insertions', () => {
      it('should throw UserNotFoundException if user does not exist', async () => {
        invalidData.note_text = faker.string.alpha(10);
        invalidData.note_title = faker.string.alpha(10);

        jest.spyOn(mockUserRepository, 'findById').mockResolvedValueOnce(null);
        await expect(
          useCase.execute(noteId, userId, invalidData),
        ).rejects.toThrow(UserNotFoundException);
      });

      it('should throw NoteNotFoundException if the note does not exist', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest.spyOn(mockNoteRepository, 'findById').mockResolvedValueOnce(null);
        await expect(
          useCase.execute(noteId, userId, invalidData),
        ).rejects.toThrow(NoteNotFoundException);
      });

      it('should throw UnauthorizedException if the note does not belong to the user', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest
          .spyOn(mockNoteRepository, 'findById')
          .mockResolvedValueOnce({ user_id: 'different_user_id' } as any);
        await expect(
          useCase.execute(noteId, userId, invalidData),
        ).rejects.toThrow(UnauthorizedException);
      });
    });
  });

  describe('\nSuccessful cases', () => {
    it('should successfully edit a note', async () => {
      jest
        .spyOn(mockUserRepository, 'findById')
        .mockResolvedValueOnce({} as any);
      jest
        .spyOn(mockNoteRepository, 'findById')
        .mockResolvedValueOnce({ user_id: userId } as any);
      jest.spyOn(mockNoteRepository, 'edit').mockResolvedValueOnce({} as any);
      await expect(
        useCase.execute(noteId, userId, invalidData),
      ).resolves.not.toThrow();
    });
  });
});
