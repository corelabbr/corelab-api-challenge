import { UnauthorizedException } from '@nestjs/common';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { StarNoteRequestDto } from '../../domain/dtos/requests/StarNote.request.dto';
import { NoteRepository } from '../db/repositories/note.repository';
import { StarNoteUsecase } from './star-note.usecase';
import { faker } from '@faker-js/faker';

describe('Star Note Use case Test Suites', () => {
  let useCase: StarNoteUsecase;
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
    useCase = new StarNoteUsecase(mockNoteRepository, mockUserRepository);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const invalidData: StarNoteRequestDto = {
    note_id: faker.string.uuid(),
  };

  const userId = faker.string.uuid();

  describe('\nUnsuccessful cases:', () => {
    describe('\nConflictuous/Unauthorized insertions', () => {
      it('should throw UserNotFoundException if the user does not exist', async () => {
        jest.spyOn(mockUserRepository, 'findById').mockResolvedValueOnce(null);

        await expect(useCase.execute(invalidData, userId)).rejects.toThrow(
          UserNotFoundException,
        );
      });

      it('should throw NoteNotFoundException if the note does not exist', async () => {
        jest
          .spyOn(mockUserRepository, 'findById')
          .mockResolvedValueOnce({} as any);
        jest.spyOn(mockNoteRepository, 'findById').mockResolvedValueOnce(null);
        await expect(useCase.execute(invalidData, userId)).rejects.toThrow(
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
        await expect(useCase.execute(invalidData, 'userId')).rejects.toThrow(
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
      jest.spyOn(mockNoteRepository, 'star').mockResolvedValueOnce({} as any);
      await expect(useCase.execute(invalidData, userId)).resolves.not.toThrow();
    });
  });
});
