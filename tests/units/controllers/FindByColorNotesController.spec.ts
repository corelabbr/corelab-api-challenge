import { Request, Response, NextFunction } from 'express';
import { findByColorNotesController } from '../../../src/app/controllers/FindByColorNotesController';
import { findByColorNotesService } from '../../../src/app/services/FindByColorNotesService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../../../src/app/services/FindByColorNotesService');

describe('FindByColorNotesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: { color: 'red' },
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

  it('should return notes by color with status 200', async () => {
    const mockNotes = [{ id: '1', title: 'Note 1', text: 'Text 1', color: 'red', favorite: false, taskId: 'task1' }];
    (findByColorNotesService.findByColor as jest.Mock).mockResolvedValueOnce(mockNotes);

    await findByColorNotesController.findByColor(req as Request, res as Response, next);

    expect(findByColorNotesService.findByColor).toHaveBeenCalledWith('red');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockNotes);
  });

  it('should handle errors and return 500', async () => {
    const error = new Error('Internal server error');
    (findByColorNotesService.findByColor as jest.Mock).mockRejectedValueOnce(error);

    await findByColorNotesController.findByColor(req as Request, res as Response, next);

    expect(findByColorNotesService.findByColor).toHaveBeenCalledWith('red');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(error);
  });
});
