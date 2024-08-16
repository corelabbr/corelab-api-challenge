import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { updateNotesController } from '../../../src/app/controllers/UpdateNotesController';
import { updateNotesService } from '../../../src/app/services/UpdateNotesService';

jest.mock('../../../src/app/services/UpdateNotesService');

describe('UpdateNotesController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      params: {} as any,
      body: {} as any,
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

  it('should update notes successfully and return status 200', async () => {
    req.params = { id: 'note1' };
    req.body = { title: 'Updated Title', text: 'Updated Text' };
    const mockUpdatedNotes = {
      id: 'note1',
      title: 'Updated Title',
      text: 'Updated Text',
      color: 'blue',
      favorite: true,
    };

    (updateNotesService.update as jest.Mock).mockResolvedValueOnce(mockUpdatedNotes);

    await updateNotesController.update(req as Request, res as Response, next);

    expect(updateNotesService.update).toHaveBeenCalledWith('note1', {
      title: 'Updated Title',
      text: 'Updated Text',
    });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockUpdatedNotes);
  });

  it('should return 422 if id or no fields to update are provided', async () => {
    req.params = { id: '' };
    req.body = { title: '', text: '', color: '', favorite: undefined };

    await updateNotesController.update(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.UNPROCESSABLE_ENTITY);
    expect(res.send).toHaveBeenCalledWith({ error: 'Id and at least one field to update are required!' });
    expect(next).toHaveBeenCalled();
  });

  it('should return 404 if notes are not found', async () => {
    req.params = { id: 'note1' };
    req.body = { title: 'Updated Title' };
    (updateNotesService.update as jest.Mock).mockResolvedValueOnce(null);

    await updateNotesController.update(req as Request, res as Response, next);

    expect(updateNotesService.update).toHaveBeenCalledWith('note1', { title: 'Updated Title' });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.send).toHaveBeenCalledWith({ error: 'Notes not found!' });
    expect(next).toHaveBeenCalled();
  });

  it('should handle errors and return 500', async () => {
    req.params = { id: 'note1' };
    req.body = { title: 'Updated Title' };
    const error = new Error('Internal server error');
    (updateNotesService.update as jest.Mock).mockRejectedValueOnce(error);

    await updateNotesController.update(req as Request, res as Response, next);

    expect(updateNotesService.update).toHaveBeenCalledWith('note1', { title: 'Updated Title' });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.send).toHaveBeenCalledWith({ error: 'Internal server error!' });
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should update notes with empty title and check coverage for empty title', async () => {
    req.params = { id: 'note1' };
    req.body = { title: '', text: 'Updated Text' };
    const mockUpdatedNotes = {
      id: 'note1',
      title: '',
      text: 'Updated Text',
      color: 'blue',
      favorite: true,
    };

    (updateNotesService.update as jest.Mock).mockResolvedValueOnce(mockUpdatedNotes);

    await updateNotesController.update(req as Request, res as Response, next);

    expect(updateNotesService.update).toHaveBeenCalledWith('note1', {
      title: '',
      text: 'Updated Text',
    });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockUpdatedNotes);
  });

  it('should handle update with specific favorite boolean value', async () => {
    req.params = { id: 'note1' };
    req.body = { favorite: true };
    const mockUpdatedNotes = {
      id: 'note1',
      title: 'Existing Title',
      text: 'Existing Text',
      color: 'blue',
      favorite: true,
    };

    (updateNotesService.update as jest.Mock).mockResolvedValueOnce(mockUpdatedNotes);

    await updateNotesController.update(req as Request, res as Response, next);

    expect(updateNotesService.update).toHaveBeenCalledWith('note1', {
      favorite: true,
    });
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.send).toHaveBeenCalledWith(mockUpdatedNotes);
  });
});