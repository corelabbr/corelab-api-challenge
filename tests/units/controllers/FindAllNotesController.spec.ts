import { Request, Response, NextFunction } from 'express';
import { findAllNotesController } from '../../../src/app/controllers/FindAllNotesController';
import { findAllNotesService } from '../../../src/app/services/FindAllNotesService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../../../src/app/services/FindAllNotesService');

describe('FindAllNotesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
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

  it('should return all notes with status 200', async () => {
    const mockNotes = [{ id: '1', title: 'Note 1', text: 'Text 1', color: 'red', favorite: false, taskId: 'task1' }];
    (findAllNotesService.findAll as jest.Mock).mockResolvedValueOnce(mockNotes);

    await findAllNotesController.findAll(req as Request, res as Response, next);

    expect(findAllNotesService.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockNotes);
  });

  it('should handle errors and return 500', async () => {
    const error = new Error('Internal server error');
    (findAllNotesService.findAll as jest.Mock).mockRejectedValueOnce(error);

    await findAllNotesController.findAll(req as Request, res as Response, next);

    expect(findAllNotesService.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(error);
  });
});
