import { Request, Response, NextFunction } from 'express';
import { findByFavoriteNotesController } from '../../../src/app/controllers/FindByFavoriteNotesController';
import { findByFavoriteNotesService } from '../../../src/app/services/FindByFavoriteNotesService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../../../src/app/services/FindByFavoriteNotesService');

describe('FindByFavoriteNotesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {} as any,
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

  it('should return notes filtered by favorite status with status 200', async () => {
    req.params = { favorite: 'true' };
    const mockNotes = [
      { id: '1', title: 'Note 1', text: 'Text 1', color: 'red', favorite: true, taskId: 'task1' }
    ];
    (findByFavoriteNotesService.findByFavorite as jest.Mock).mockResolvedValueOnce(mockNotes);

    await findByFavoriteNotesController.findByFavorite(req as Request, res as Response, next);

    expect(findByFavoriteNotesService.findByFavorite).toHaveBeenCalledWith(true);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockNotes);
  });

  it('should handle errors and return 500', async () => {
    req.params = { favorite: 'true' };
    const error = new Error('Internal server error');
    (findByFavoriteNotesService.findByFavorite as jest.Mock).mockRejectedValueOnce(error);

    await findByFavoriteNotesController.findByFavorite(req as Request, res as Response, next);

    expect(findByFavoriteNotesService.findByFavorite).toHaveBeenCalledWith(true);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should handle "favorite" param as false', async () => {
    req.params = { favorite: 'false' };
    const mockNotes = [
      { id: '2', title: 'Note 2', text: 'Text 2', color: 'blue', favorite: false, taskId: 'task2' }
    ];
    (findByFavoriteNotesService.findByFavorite as jest.Mock).mockResolvedValueOnce(mockNotes);

    await findByFavoriteNotesController.findByFavorite(req as Request, res as Response, next);

    expect(findByFavoriteNotesService.findByFavorite).toHaveBeenCalledWith(false);
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockNotes);
  });
});
