import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { INotes } from '../../../src/app/interfaces/INotes';
import { createNotesService } from '../../../src/app/services/CreateNotesService';
import { createNotesController } from '../../../src/app/controllers/CreateNotesController';

jest.mock('../../../src/app/services/CreateNotesService');

describe('CreateNotesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {
        title: 'Test Note',
        text: 'This is a test note.',
        color: 'yellow',
        favorite: false,
      },
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      format: jest.fn().mockImplementation((formats) => {
        if (formats['application/json']) {
          formats['application/json']();
        }
      }),
    };
    
    next = jest.fn();
  });

  it('should create a new note and return it with a 201 status code', async () => {
    const mockNote: any = {
      title: 'Test Note',
      text: 'This is a test note.',
      color: 'yellow',
      favorite: false,
    };

    (createNotesService.create as jest.Mock).mockResolvedValue(mockNote);
    
    await createNotesController.create(req as Request, res as Response, next);

    expect(createNotesService.create).toHaveBeenCalledWith(mockNote);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.format).toHaveBeenCalledWith({
      'application/json': expect.any(Function),
    });
    expect(res.send).toHaveBeenCalledWith(mockNote);
    expect(next).not.toHaveBeenCalled();
  });

  it('should return a 422 status code if text is not provided', async () => {
    req.body.text = '';

    await createNotesController.create(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res.format).toHaveBeenCalledWith({
      'application/json': expect.any(Function),
    });
    expect(res.send).toHaveBeenCalledWith({ error: 'Text required!' });
  });

  it('should return a 500 status code if an error occurs', async () => {
    const error = new Error('Service error');
    (createNotesService.create as jest.Mock).mockRejectedValue(error);

    await createNotesController.create(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.format).toHaveBeenCalledWith({
      'application/json': expect.any(Function),
    });
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should return a 500 status code and call next if create service fails', async () => {
    const mockNote: INotes = {
      id: '',
      title: 'Test Note',
      text: 'This is a test note.',
      color: 'yellow',
      favorite: false,
    };

    (createNotesService.create as jest.Mock).mockRejectedValue(new Error('Service error'));

    await createNotesController.create(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.format).toHaveBeenCalledWith({
      'application/json': expect.any(Function),
    });
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  it('should set color to white if not provided', async () => {
    req.body.color = undefined;

    const mockNote: any = {
      title: 'Test Note',
      text: 'This is a test note.',
      color: 'white',
      favorite: false,
    };

    (createNotesService.create as jest.Mock).mockResolvedValue(mockNote);
    
    await createNotesController.create(req as Request, res as Response, next);

    expect(createNotesService.create).toHaveBeenCalledWith(mockNote);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.format).toHaveBeenCalledWith({
      'application/json': expect.any(Function),
    });
    expect(res.send).toHaveBeenCalledWith(mockNote);
    expect(next).not.toHaveBeenCalled();
  });

  it('should set favorite to false if not provided', async () => {
    req.body.favorite = undefined;

    const mockNote: any = {
      title: 'Test Note',
      text: 'This is a test note.',
      color: 'yellow',
      favorite: false,
    };

    (createNotesService.create as jest.Mock).mockResolvedValue(mockNote);

    await createNotesController.create(req as Request, res as Response, next);

    expect(createNotesService.create).toHaveBeenCalledWith(mockNote);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.CREATED);
    expect(res.format).toHaveBeenCalledWith({
      'application/json': expect.any(Function),
    });
    expect(res.send).toHaveBeenCalledWith(mockNote);
    expect(next).not.toHaveBeenCalled();
  });
});
