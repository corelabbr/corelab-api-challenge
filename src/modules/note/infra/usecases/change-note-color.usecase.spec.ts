import { UnauthorizedException } from '@nestjs/common';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { ChangeNoteColorRequestDto } from '../../domain/dtos/requests/ChangeNoteColor.request.dto';
import { NoteRepository } from '../db/repositories/note.repository';
import { ChangeNoteColorUsecase } from './change-note-color.usecase';
import { faker } from '@faker-js/faker';

describe('Change Note Color Usecase Test Suites', () => {
  let useCase: ChangeNoteColorUsecase;
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
    useCase = new ChangeNoteColorUsecase(
      mockNoteRepository,
      mockUserRepository,
    );
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const invalidData: ChangeNoteColorRequestDto = {
    note_id: faker.string.uuid(),
    note_color: faker.color.rgb() as any,
  };

  const userId = faker.string.uuid();

  describe('\nUnsuccessful cases:', () => {
    describe('\nConflictuous/Unauthorized insertions', () => {
      it('should throw UserNotFoundException if the user does not exist', async () => {
        jest.spyOn(mockUserRepository, 'findById').mockResolvedValueOnce(null);

        await expect(useCase.execute(userId, invalidData)).rejects.toThrow(
          UserNotFoundException,
        );
      });

      it('should throw NoteNotFoundException if the note does not exist', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest.spyOn(mockNoteRepository, 'findById').mockResolvedValueOnce(null);
        await expect(useCase.execute(userId, invalidData)).rejects.toThrow(
          NoteNotFoundException,
        );
      });

      it('should throw UnauthorizedException if the note does not belong to the user', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest
          .spyOn(mockNoteRepository, 'findById')
          .mockResolvedValueOnce({ user_id: 'different_user_id' } as any);
        await expect(useCase.execute(userId, invalidData)).rejects.toThrow(
          UnauthorizedException,
        );
      });
    });
  });

  describe('\nSuccessful cases', () => {
    it('should successfully star a note', async () => {
      jest
        .spyOn(mockUserRepository, 'findById')
        .mockResolvedValueOnce({} as any);
      jest
        .spyOn(mockNoteRepository, 'findById')
        .mockResolvedValueOnce({} as any);
      jest
        .spyOn(mockNoteRepository, 'changeColor')
        .mockResolvedValueOnce({} as any);
      await expect(useCase.execute(userId, invalidData)).resolves.not.toThrow();
    });
  });
});
