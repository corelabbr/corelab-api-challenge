import { Note } from './note.entity';

describe('Note Entity Test Suites', () => {
  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['nextTick'] });
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  const note = new Note(1, 'title', 'note_text', 1, 'lightblue');

  it('an instance of the Note class should have all of its attributes', async () => {
    expect(note).toHaveProperty('id_note');
    expect(note).toHaveProperty('title');
    expect(note).toHaveProperty('note_text');
    expect(note).toHaveProperty('user_id');
    expect(note).toHaveProperty('color');
    expect(note).toHaveProperty('deleted_at');
    expect(note).toHaveProperty('created_at');
    expect(note).toHaveProperty('updated_at');
  });

  it('an instance of the Note class should have its id_note attribute being of type number', async () => {
    expect(note.id_note).toEqual(expect.any(Number));
  });

  it('an instance of the Note class should have its title attribute being of type string', async () => {
    expect(note.title).toEqual(expect.any(String));
  });

  it('an instance of the Note class should have its note_text attribute being of type string', async () => {
    expect(note.note_text).toEqual(expect.any(String));
  });

  it('an instance of the Note class should have its user_id attribute being of type number', async () => {
    expect(note.user_id).toEqual(expect.any(Number));
  });

  it('an instance of the Note class should have its color attribute being of type string', async () => {
    expect(note.user_id).toEqual(expect.any(String));
  });

  it('an instance of the Note class should have its deleted_at attribute being null', async () => {
    expect(note.deleted_at).toBeNull();
  });

  it('an instance of the Note class should have its created_at attribute being of type Date', async () => {
    expect(note.created_at).toEqual(expect.any(Date));
  });

  it('an instance of the Note class should have its updated_at attribute being of type Date', async () => {
    expect(note.updated_at).toEqual(expect.any(Date));
  });
});
