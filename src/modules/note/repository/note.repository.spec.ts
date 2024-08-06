import { Test, TestingModule } from '@nestjs/testing';
import { NoteRepository } from './note.repository';
import { DataSource } from 'typeorm';
import { Note } from '../entity/note.entity';

describe('Note Repository Test Suites', () => {
  let noteRepository: NoteRepository;

  const note = new Note(
    1,
    'title',
    'note_text',
    1,
    'lightblue',
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
        NoteRepository,
        {
          provide: DataSource,
          useValue: dataSource,
        },
      ],
    }).compile();

    noteRepository = module.get<NoteRepository>(NoteRepository);
  });

  it('should not find a note by its id using the getById passing an invalid id', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(null);

    const foundNote = await noteRepository.findById(0);

    expect(foundNote).toBe(null);
  });

  it('should find a note by its id using the getById passing a valid id', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(note);

    const foundNote = await noteRepository.findById(1);

    expect(foundNote).toBe(note);
    expect(foundNote).toHaveProperty('id_note', 1);
    expect(foundNote).toHaveProperty('title', 'title');
    expect(foundNote).toHaveProperty('note_text', 'note_text');
    expect(foundNote).toHaveProperty('user_id', 1);
    expect(foundNote).toHaveProperty('color', 'lightblue');
    expect(foundNote).toHaveProperty('created_at');
    expect(foundNote).toHaveProperty('updated_at');
    expect(foundNote).toHaveProperty('deleted_at');
  });

  it('should not find a note by its title using the getByTitle passing an invalid title', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(null);

    const foundNote = await noteRepository.findByTitle(1, 'title');

    expect(foundNote).toBe(null);
  });

  it('should find a note by its title using the getByTitle passing a valid title', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(note);

    const foundNote = await noteRepository.findByTitle(1, 'title');

    expect(foundNote).toBe(note);
    expect(foundNote).toHaveProperty('id_note', 1);
    expect(foundNote).toHaveProperty('title', 'title');
    expect(foundNote).toHaveProperty('note_text', 'note_text');
    expect(foundNote).toHaveProperty('user_id', 1);
    expect(foundNote).toHaveProperty('color', 'lightblue');
    expect(foundNote).toHaveProperty('created_at');
    expect(foundNote).toHaveProperty('updated_at');
    expect(foundNote).toHaveProperty('deleted_at');
  });

  it('should find all notes from a single user', async () => {
    const findSpy = jest
      .spyOn(noteRepository, 'find')
      .mockResolvedValue([note]);

    const foundNotes = await noteRepository.findUserNotes(1);

    expect(foundNotes).toEqual([note]);
  });

  it('should find all notes from a single user by their color', async () => {
    const findSpy = jest
      .spyOn(noteRepository, 'find')
      .mockResolvedValue([note]);

    const foundNotes = await noteRepository.findUserNotesByColor(1, 'lightblue');

    expect(foundNotes).toEqual([note]);
  });

  it('should not find a note by its title using the getNoteByTitle passing an invalid title', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(null);

    const foundNote = await noteRepository.findNoteByTitle(1, 'bad title');

    expect(foundNote).toBe(null);
  });

  it('should find a note by its title using the getNoteByTitle passing a valid title', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(note);

    const foundNote = await noteRepository.findNoteByTitle(1, 'title');

    expect(foundNote).toBe(note);
    expect(foundNote).toHaveProperty('id_note', 1);
    expect(foundNote).toHaveProperty('title', 'title');
    expect(foundNote).toHaveProperty('note_text', 'note_text');
    expect(foundNote).toHaveProperty('user_id', 1);
    expect(foundNote).toHaveProperty('color', 'lightblue');
    expect(foundNote).toHaveProperty('created_at');
    expect(foundNote).toHaveProperty('updated_at');
    expect(foundNote).toHaveProperty('deleted_at');
  });

  it('should edit a note', async () => {
    const findOneSpy = jest
      .spyOn(noteRepository, 'findOne')
      .mockResolvedValue(note);

    const saveSpy = jest
      .spyOn(noteRepository, 'save')
      .mockResolvedValue(note);

    const editedNote = await noteRepository.editNote(
      1,
      'title',
      'note_text',
      'lightblue',
    );

    expect(editedNote).toBe(note);
    expect(editedNote).toHaveProperty('id_note', 1);
    expect(editedNote).toHaveProperty('title', 'title');
    expect(editedNote).toHaveProperty('note_text', 'note_text');
    expect(editedNote).toHaveProperty('user_id', 1);
    expect(editedNote).toHaveProperty('color', 'lightblue');
    expect(editedNote).toHaveProperty('created_at');
    expect(editedNote).toHaveProperty('updated_at');
    expect(editedNote).toHaveProperty('deleted_at');
  });

  it('should soft delete a note', async () => {
    const softDeleteSpy = jest
      .spyOn(noteRepository, 'softDelete')
      .mockResolvedValue(undefined);

    const softDeleted = await noteRepository.softDeleteById(1);

    expect(softDeleted).toBe(undefined);
  });
});
