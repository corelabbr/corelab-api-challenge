import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { FavoriteRepository } from './favorite.repository';
import { Favorite } from '../entity/favorite.entity';

describe('Note Repository Test Suites', () => {
  let favoriteNoteRepository: FavoriteRepository;

  const note = new Favorite(
    1,
    1
  )

  const dataSource = {
    createEntityManager: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FavoriteRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    favoriteNoteRepository = module.get<FavoriteRepository>(FavoriteRepository);
  });

  it('should not find a note by its id using the getById passing an invalid id', async () => {
    const findOneSpy = jest
      .spyOn(favoriteNoteRepository, 'findOne')
      .mockResolvedValue(null);

    const foundNote = await favoriteNoteRepository.findFavoriteNote(0, 0);

    expect(foundNote).toBe(null);
  });

  it('should find a note by its id using the getById passing a valid id', async () => {
    const findOneSpy = jest
      .spyOn(favoriteNoteRepository, 'findOne')
      .mockResolvedValue(note);

    const foundNote = await favoriteNoteRepository.findFavoriteNote(1, 1);

    expect(foundNote).toBe(note);
  });

  it('should not find all the favorite notes passing an invalid user_id', async ()  =>  {
    const findSpy = jest
      .spyOn(favoriteNoteRepository, 'find')
      .mockResolvedValue([]);

    const foundNotes = await favoriteNoteRepository.findUserFavoriteNotes(0);

    expect(foundNotes).toEqual([]);
  })

  it('should find all the fav notes that belong to the user', async () => {
    const findSpy = jest
      .spyOn(favoriteNoteRepository, 'find')
      .mockResolvedValue([note]);

    const foundNotes = await favoriteNoteRepository.findUserFavoriteNotes(1);

    expect(foundNotes).toEqual([note]);
  });

  
});
