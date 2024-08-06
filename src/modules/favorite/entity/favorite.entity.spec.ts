import { Favorite } from "./favorite.entity";

describe('Favorite Note Entity Test Suites', () => {
  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const note = new Favorite(1, 1);

  it('an instance of the Favorite class should have all of its attributes', async () => {
    expect(note).toHaveProperty('user_id');
    expect(note).toHaveProperty('note_id');
    expect(note).toHaveProperty('deleted_at');
    expect(note).toHaveProperty('created_at');
    expect(note).toHaveProperty('updated_at');
  });

  it('an instance of the Favorite class should have its user_id attribute being of type number', async () => {
    expect(note.user_id).toEqual(expect.any(Number));
  });

  it('an instance of the Favorite class should have its note_id attribute being of type number', async () => {
    expect(note.note_id).toEqual(expect.any(Number));
  });

  it('an instance of the Favorite class should have its deleted_at attribute being null', async () => {
    expect(note.deleted_at).toBeNull();
  });

  it('an instance of the Favorite class should have its created_at attribute being of type Date', async () => {
    expect(note.created_at).toEqual(expect.any(Date));
  });

  it('an instance of the Favorite class should have its updated_at attribute being of type Date', async () => {
    expect(note.updated_at).toEqual(expect.any(Date));
  });
});