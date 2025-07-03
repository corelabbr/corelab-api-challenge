import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

const noteMock = {
  id: '1',
  title: 'Note 1',
  body: 'Body 1',
  color: 'red',
  isFavorite: false,
  userId: 'user1',
};

describe('NotesController', () => {
  let controller: NotesController;

  const notesServiceMock = {
    findAll: jest.fn().mockResolvedValue([noteMock]),
    findOne: jest.fn().mockResolvedValue(noteMock),
    create: jest.fn().mockResolvedValue(noteMock),
    update: jest.fn().mockResolvedValue({
      ...noteMock,
      title: 'Title Updated',
      body: 'Body Updated',
      color: 'Color Updated',
    }),
    updateColor: jest.fn().mockResolvedValue({ ...noteMock, color: 'blue' }),
    updateFavorite: jest
      .fn()
      .mockResolvedValue({ ...noteMock, isFavorite: true }),
    remove: jest.fn().mockResolvedValue({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [{ provide: NotesService, useValue: notesServiceMock }],
    }).compile();

    controller = module.get<NotesController>(NotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return notes', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([noteMock]);
    expect(notesServiceMock.findAll).toHaveBeenCalled();
  });

  it('findOne should return a note by id', async () => {
    const result = await controller.findOne('1');
    expect(result).toEqual(noteMock);
    expect(notesServiceMock.findOne).toHaveBeenCalledWith('1');
  });

  it('create should create a note', async () => {
    const dto: CreateNoteDto = {
      title: 'Note 1',
      body: 'Body 1',
      color: 'red',
      userId: 'user1',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(noteMock);
    expect(notesServiceMock.create).toHaveBeenCalledWith(dto);
  });

  it('update should update a note', async () => {
    const dto: UpdateNoteDto = {
      title: 'Title Updated',
      body: 'Body Updated',
      color: 'Color Updated',
    };
    const result = await controller.update('1', dto);
    expect(result).toEqual({
      ...noteMock,
      title: 'Title Updated',
      body: 'Body Updated',
      color: 'Color Updated',
    });
    expect(notesServiceMock.update).toHaveBeenCalledWith('1', dto);
  });

  it('updateColor should update color', async () => {
    const result = await controller.updateColor('1', 'blue');
    expect(result).toEqual({ ...noteMock, color: 'blue' });
    expect(notesServiceMock.updateColor).toHaveBeenCalledWith('1', 'blue');
  });

  it('updateFavorite should update isFavorite', async () => {
    const result = await controller.updateFavorite('1', true);
    expect(result).toEqual({ ...noteMock, isFavorite: true });
    expect(notesServiceMock.updateFavorite).toHaveBeenCalledWith('1', true);
  });

  it('remove should delete a note', async () => {
    const result = await controller.remove('1');
    expect(result).toEqual({ deleted: true });
    expect(notesServiceMock.remove).toHaveBeenCalledWith('1');
  });
});
