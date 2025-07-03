import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { User } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';

const noteMock = {
  id: '1',
  title: 'Note 1',
  body: 'Body 1',
  color: 'red',
  isFavorite: false,
  user: { id: 'user1' },
};

const noteArray = [noteMock];

const userMock = {
  id: 'user1',
  name: 'User',
  email: 'user@mail.com',
  password: 'hashed',
  role: 'USER',
  listNotes: [],
};

const noteRepositoryMock = {
  find: jest.fn().mockResolvedValue(noteArray),
  findOne: jest
    .fn()
    .mockImplementation(({ where: { id } }) =>
      Promise.resolve(noteArray.find((n) => n.id === id)),
    ),
  create: jest.fn().mockImplementation((dto: CreateNoteDto) => ({ ...dto })),
  save: jest
    .fn()
    .mockImplementation((note) => Promise.resolve({ ...note, id: '2' })),
  update: jest.fn().mockResolvedValue(undefined),
  delete: jest.fn().mockResolvedValue(undefined),
};

const userRepositoryMock = {
  findOneBy: jest
    .fn()
    .mockImplementation(({ id }) =>
      Promise.resolve(id === userMock.id ? userMock : undefined),
    ),
};

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        { provide: getRepositoryToken(Note), useValue: noteRepositoryMock },
        { provide: getRepositoryToken(User), useValue: userRepositoryMock },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return notes with userId', async () => {
    const result = await service.findAll();
    expect(result).toEqual([
      {
        id: '1',
        title: 'Note 1',
        body: 'Body 1',
        color: 'red',
        isFavorite: false,
        userId: 'user1',
      },
    ]);
    expect(noteRepositoryMock.find).toHaveBeenCalled();
  });

  it('findOne should return a note by id', async () => {
    const result = await service.findOne('1');
    expect(result).toEqual({
      id: '1',
      title: 'Note 1',
      body: 'Body 1',
      color: 'red',
      isFavorite: false,
      userId: 'user1',
    });
    expect(noteRepositoryMock.findOne).toHaveBeenCalled();
  });

  it('findOne should throw NotFoundException if note not found', async () => {
    noteRepositoryMock.findOne.mockResolvedValueOnce(undefined);
    await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
  });

  it('create should throw NotFoundException if user not found', async () => {
    userRepositoryMock.findOneBy.mockResolvedValueOnce(undefined);
    await expect(
      service.create({
        title: 'New Note',
        body: 'Body',
        color: 'blue',
        userId: 'notfound',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('create should create and return a note', async () => {
    userRepositoryMock.findOneBy.mockResolvedValueOnce(userMock);
    const dto = {
      title: 'New Note',
      body: 'Body',
      color: 'blue',
      userId: userMock.id,
    };
    const result = await service.create(dto);
    expect(noteRepositoryMock.create).toHaveBeenCalled();
    expect(noteRepositoryMock.save).toHaveBeenCalled();
    expect(result).toHaveProperty('id');
  });

  it('update should update a note and return it', async () => {
    const result = await service.update('1', {
      title: 'Title Updated',
      body: 'Body Updated',
      color: 'Color Updated',
    });
    expect(noteRepositoryMock.update).toHaveBeenCalledWith('1', {
      title: 'Title Updated',
      body: 'Body Updated',
      color: 'Color Updated',
    });
    expect(result).toHaveProperty('id', '1');
  });

  it('updateColor should update color and return note', async () => {
    const result = await service.updateColor('1', 'green');
    expect(noteRepositoryMock.update).toHaveBeenCalledWith('1', {
      color: 'green',
    });
    expect(result).toHaveProperty('color', 'red'); // mock retorna sempre 'red'
  });

  it('updateFavorite should update isFavorite and return note', async () => {
    const result = await service.updateFavorite('1', true);
    expect(noteRepositoryMock.update).toHaveBeenCalledWith('1', {
      isFavorite: true,
    });
    expect(result).toHaveProperty('isFavorite', false); // mock retorna sempre false
  });

  it('remove should delete a note', async () => {
    const result = await service.remove('1');
    expect(noteRepositoryMock.delete).toHaveBeenCalledWith('1');
    expect(result).toEqual({ deleted: true });
  });
});
