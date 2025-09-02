import { EncrypterProvider } from '../../../../../shared/infra/providers/Encrypter.provider';
import { NoteRepository } from './note.repository';
import { faker } from '@faker-js/faker';

describe('Gym Repository Test Suites', () => {
  let repository: NoteRepository;
  let encrypterProvider: EncrypterProvider;

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  beforeEach(() => {
    encrypterProvider = new EncrypterProvider();
    repository = new NoteRepository(encrypterProvider);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
