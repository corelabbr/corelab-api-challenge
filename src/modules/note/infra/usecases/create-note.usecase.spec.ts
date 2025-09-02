import { UnauthorizedException } from '@nestjs/common';
import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { CreateNoteUsecase } from './create-note.usecase';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { NoteRepository } from '../db/repositories/note.repository';
import { UserNotFoundException } from '../../../user/domain/dtos/errors/UserNotFound.exception';
import { CreateNoteBodyDTO } from '../../domain/dtos/requests/CreateNote.request.dto';

describe('Create Note Usecase Test Suites', () => {
  let useCase: CreateNoteUsecase;
  let encrypterProvider: EncrypterProvider;
  let mockUserRepository: UserRepository;
  let hashProvider: HashProvider;
  let mockNoteRepository: NoteRepository;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(async () => {
    encrypterProvider = new EncrypterProvider();
    hashProvider = new HashProvider();
    mockUserRepository = new UserRepository(hashProvider, encrypterProvider);
    mockNoteRepository = new NoteRepository(encrypterProvider);
    useCase = new CreateNoteUsecase(mockUserRepository, mockNoteRepository);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should not create a note if the user does not exist', async () => {
    const data: CreateNoteBodyDTO = {
      note_title: 'Test Note',
      note_text: 'This is a test note',
      note_color: 'blue',
      starred: false,
    };
    const user_id = 'non-existent-id';

    jest.spyOn(mockUserRepository, 'findById').mockResolvedValueOnce(null);

    await expect(useCase.execute(data, user_id)).rejects.toThrow(
      UserNotFoundException,
    );
  });

  it('should create a note successfully', async () => {
    const data: CreateNoteBodyDTO = {
      note_title: 'Test Note',
      note_text: 'This is a test note',
      note_color: 'blue',
      starred: false,
    };
    const user_id = 'admin-id';

    jest
      .spyOn(mockUserRepository, 'findById')
      .mockResolvedValueOnce({ id_user: user_id });

    jest.spyOn(mockNoteRepository, 'create').mockResolvedValue(data as any);

    const result = await useCase.execute(data, user_id);

    expect(result).toEqual(data);
  });
});
