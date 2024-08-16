import { Request, Response, NextFunction } from 'express';
import { deleteNotesController } from '../../../src/app/controllers/DeleteNotesController';
import { deleteNotesService } from '../../../src/app/services/DeleteNotesService';
import { findByIdNotesService } from '../../../src/app/services/FindByIdNotesService';
import { StatusCodes } from 'http-status-codes';

jest.mock('../../../src/app/services/DeleteNotesService');
jest.mock('../../../src/app/services/FindByIdNotesService');

describe('DeleteNotesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: { id: '1' },
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

  it('should delete a note and return status 204', async () => {
    (findByIdNotesService.findById as jest.Mock).mockResolvedValueOnce(true);
    (deleteNotesService.delete as jest.Mock).mockResolvedValueOnce(true);

    await deleteNotesController.delete(req as Request, res as Response, next);

    expect(findByIdNotesService.findById).toHaveBeenCalledWith('1');
    expect(deleteNotesService.delete).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NO_CONTENT);
    expect(res.send).toHaveBeenCalled();
  });

  it('should return 404 if the note is not found', async () => {
    (findByIdNotesService.findById as jest.Mock).mockResolvedValueOnce(false);

    await deleteNotesController.delete(req as Request, res as Response, next);

    expect(findByIdNotesService.findById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.send).toHaveBeenCalledWith({ error: 'Notes not found!' });
  });

  it('should handle errors and return 500', async () => {
    const error = new Error('Internal server error');
    (findByIdNotesService.findById as jest.Mock).mockRejectedValueOnce(error);

    await deleteNotesController.delete(req as Request, res as Response, next);

    expect(findByIdNotesService.findById).toHaveBeenCalledWith('1');
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(error);
  });
});
