import { NoteRepository } from './note.repository';

describe('NoteRepository', () => {
  it('should be defined', () => {
    expect(new NoteRepository()).toBeDefined();
  });
});
