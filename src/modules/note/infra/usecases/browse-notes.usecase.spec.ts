import { EncrypterProvider } from '../../../../shared/infra/providers/Encrypter.provider';
import { UserRepository } from '../../../user/infra/db/repositories/user.repository';
import { HashProvider } from '../../../user/infra/providers/hash.provider';
import { NoteRepository } from '../db/repositories/note.repository';
import { BrowseNotesUsecase } from './browse-notes.usecase';
import { faker } from '@faker-js/faker';

describe('Browse Notes Use Case', () => {
  let usecase: BrowseNotesUsecase;
  let mockRepository: NoteRepository;
  let encrypterProvider: EncrypterProvider;
  let userRepository: UserRepository;
  let hashProvider: HashProvider;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(async () => {
    encrypterProvider = new EncrypterProvider();
    mockRepository = new NoteRepository(encrypterProvider);
    hashProvider = new HashProvider();
    userRepository = new UserRepository(hashProvider, encrypterProvider);

    usecase = new BrowseNotesUsecase(mockRepository, userRepository);
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const mockNote = {
    id_note: 'valid-id',
    note_title: faker.company.name(),
    note_color: faker.lorem.paragraph(),
    user_id: 'valid-user-id',
    note_text: faker.lorem.paragraphs(2),
    starred: false,
    created_at: new Date(),
    updated_at: new Date(),
  };

  it('should return an empty array when no notes are found', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce({} as any);

    jest.spyOn(mockRepository, 'findByUser').mockResolvedValueOnce([]);

    const result = await usecase.execute(mockNote.user_id);

    expect(result).toEqual([]);
  });

  it('should return a list of notes when a valid id is provided', async () => {
    jest.spyOn(userRepository, 'findById').mockResolvedValueOnce({} as any);

    jest.spyOn(mockRepository, 'findByUser').mockResolvedValueOnce([mockNote]);

    const result = await usecase.execute(mockNote.user_id);

    expect(result).toEqual([mockNote]);
  });
});
