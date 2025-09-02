import { Request, Response } from 'express';
import { AllExceptionsFilterDTO } from '../../../../../shared/domain/dtos/errors/AllException.filter.dto';
import { CreateNoteBodyDTO } from '../requests/CreateNote.request.dto';
import { EditNoteBodyDTO } from '../requests/EditNote.request.dto';
import { StarNoteRequestDto } from '../requests/StarNote.request.dto';
import { ChangeNoteColorRequestDto } from '../requests/ChangeNoteColor.request.dto';

export interface NoteControllerInterface {
  searchNotes(
    req: Request,
    res: Response,
    content: string,
  ): Promise<Response | AllExceptionsFilterDTO>;
  browseNotes(
    req: Request,
    res: Response,
  ): Promise<Response | AllExceptionsFilterDTO>;
  findNoteById(
    cuid: string,
    req: Request,
    res: Response,
  ): Promise<Response | AllExceptionsFilterDTO>;
  createNote(
    req: Request,
    res: Response,
    body: CreateNoteBodyDTO,
  ): Promise<Response | AllExceptionsFilterDTO>;
  starNote(
    req: Request,
    res: Response,
    body: StarNoteRequestDto,
  ): Promise<Response | AllExceptionsFilterDTO>;
  changeNoteColor(
    req: Request,
    res: Response,
    body: ChangeNoteColorRequestDto,
  ): Promise<Response | AllExceptionsFilterDTO>;
  editNote(
    cuid: string,
    req: Request,
    res: Response,
    body: EditNoteBodyDTO,
  ): Promise<Response | AllExceptionsFilterDTO>;
  deleteNote(
    cuid: string,
    req: Request,
    res: Response,
  ): Promise<Response | AllExceptionsFilterDTO>;
}
