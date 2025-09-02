import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AllExceptionsFilterDTO } from '../../../../shared/domain/dtos/errors/AllException.filter.dto';
import { Request, Response } from 'express';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';
import { NoteControllerInterface } from '../../domain/dtos/controllers/note.controller.dto';
import {
  CreateNoteBodyDTO,
  CreateNoteResponseDTO,
} from '../../domain/dtos/requests/CreateNote.request.dto';
import { Cache } from '@nestjs/cache-manager';
import { NotAuthenticatedException } from '../../../../shared/domain/errors/NotAuthenticated.exception';
import {
  BrowseNotesResponseDto,
  FindNoteByIdResponseDto,
} from '../../domain/dtos/requests/FindNote.request.dto';
import { NoteNotFoundException } from '../../domain/dtos/errors/NoteNotFoundException.exception';
import { CreateNoteUsecase } from '../../infra/usecases/create-note.usecase';
import { FindNoteByIdUsecase } from '../../infra/usecases/find-note-by-id.usecase';
import { BrowseNotesUsecase } from '../../infra/usecases/browse-notes.usecase';
import {
  EditNoteBodyDTO,
  EditNoteResponseDTO,
} from '../../domain/dtos/requests/EditNote.request.dto';
import { EditNoteUsecase } from '../../infra/usecases/edit-note.usecase';
import { DeleteNoteUsecase } from '../../infra/usecases/delete-note.usecase';
import { ChangeNoteColorUsecase } from '../../infra/usecases/change-note-color.usecase';
import { StarNoteUsecase } from '../../infra/usecases/star-note.usecase';
import { StarNoteRequestDto } from '../../domain/dtos/requests/StarNote.request.dto';
import { ChangeNoteColorRequestDto } from '../../domain/dtos/requests/ChangeNoteColor.request.dto';
import { ColorAlreadySetException } from '../../domain/dtos/errors/ColorAlreadySetException.exception';
import { SearchNotesUsecase } from '../../infra/usecases/search-notes.usecase';

@Controller('notes')
@ApiTags('Anotações')
export class NoteController implements NoteControllerInterface {
  constructor(
    private readonly searchNotesUseCase: SearchNotesUsecase,
    private readonly browseNotesUseCase: BrowseNotesUsecase,
    private readonly findNoteByIdUseCase: FindNoteByIdUsecase,
    private readonly createNoteUseCase: CreateNoteUsecase,
    private readonly changeNoteColorUseCase: ChangeNoteColorUsecase,
    private readonly starNoteUseCase: StarNoteUsecase,
    private readonly editNoteUseCase: EditNoteUsecase,
    private readonly deleteNoteUseCase: DeleteNoteUsecase,
    @Inject('CACHE_MANAGER')
    private readonly cacheManager: Cache,
  ) {}

  @Get('search')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Anotações trazidas com sucesso.',
    type: BrowseNotesResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  async searchNotes(
    @Req() req: Request,
    @Res() res: Response,
    @Query('content') content: string,
  ): Promise<Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const result = await this.searchNotesUseCase.execute(
      req.user.id_user,
      content,
    );

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(200).json(result);
    }
  }

  @Get('browse')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Anotações trazidas com sucesso.',
    type: BrowseNotesResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  async browseNotes(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const cachedNotes = await this.cacheManager.get(
      `notes-${req.user.id_user}`,
    );

    if (cachedNotes) return res.status(200).json(cachedNotes);

    const result = await this.browseNotesUseCase.execute(req.user.id_user);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      await this.cacheManager.set(`notes-${req.user.id_user}`, result);
      return res.status(200).json(result);
    }
  }

  @Get('find/:noteId')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Anotação trazida com sucesso.',
    type: FindNoteByIdResponseDto,
  })
  @ApiNotFoundResponse({
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new UnauthorizedException().message,
    type: AllExceptionsFilterDTO,
  })
  async findNoteById(
    @Param('noteId') noteId: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any | Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const cachedNote = await this.cacheManager.get(`note-${noteId}`);

    if (cachedNote) return res.status(200).json(cachedNote);

    const result = await this.findNoteByIdUseCase.execute(
      noteId,
      req.user.id_user,
    );

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      await this.cacheManager.set(`note-${noteId}`, result);
      return res.status(200).json(result);
    }
  }

  @Post('create')
  @ApiBearerAuth('access-token')
  @ApiCreatedResponse({
    description: 'Anotação salva com sucesso.',
    type: CreateNoteResponseDTO,
  })
  @ApiUnprocessableEntityResponse({
    description: new UnprocessableDataException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor.',
    type: AllExceptionsFilterDTO,
  })
  async createNote(
    @Req() req: Request,
    @Res() res: Response,
    @Body() createNoteBody: CreateNoteBodyDTO,
  ): Promise<any | Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const result = await this.createNoteUseCase.execute(
      createNoteBody,
      req.user.id_user,
    );

    if (result instanceof HttpException)
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });

    const allNotes = await this.browseNotesUseCase.execute(req.user.id_user);

    await this.cacheManager.set(`notes-${req.user.id_user}`, allNotes);

    await this.cacheManager.set(`note-${result.id_note}`, result);
    return res.status(201).json(result);
  }

  @Post('/star')
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse({
    description: 'Anotação des/favoritada com sucesso.',
  })
  @ApiNotFoundResponse({
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  async starNote(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: StarNoteRequestDto,
  ): Promise<Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const result = await this.starNoteUseCase.execute(body, req.user.id_user);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      const updatedNote = await this.findNoteByIdUseCase.execute(
        body.note_id,
        req.user.id_user,
      );

      const allNotes = await this.browseNotesUseCase.execute(req.user.id_user);

      await this.cacheManager.set(`notes-${req.user.id_user}`, allNotes);

      await this.cacheManager.set(`note-${body.note_id}`, updatedNote);

      return res.status(204).send();
    }
  }

  @Post('/change-color')
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse({
    description: 'Cor da anotação alterada com sucesso.',
  })
  @ApiConflictResponse({
    description: new ColorAlreadySetException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiNotFoundResponse({
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  async changeNoteColor(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: ChangeNoteColorRequestDto,
  ): Promise<Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const result = await this.changeNoteColorUseCase.execute(
      req.user.id_user,
      body,
    );

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      const updatedNote = await this.findNoteByIdUseCase.execute(
        body.note_id,
        req.user.id_user,
      );

      const allNotes = await this.browseNotesUseCase.execute(req.user.id_user);

      await this.cacheManager.set(`notes-${req.user.id_user}`, allNotes);

      await this.cacheManager.set(`note-${body.note_id}`, updatedNote);

      return res.status(204).send();
    }
  }

  @Patch('/edit/:cuid')
  @ApiBearerAuth('access-token')
  @ApiOkResponse({
    description: 'Anotação editada com sucesso.',
    type: EditNoteResponseDTO,
  })
  @ApiNotFoundResponse({
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiUnauthorizedResponse({
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  async editNote(
    @Param('cuid') cuid: string,
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: EditNoteBodyDTO,
  ): Promise<Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const result = await this.editNoteUseCase.execute(
      cuid,
      req.user.id_user,
      body,
    );

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      const allNotes = await this.browseNotesUseCase.execute(req.user.id_user);

      await this.cacheManager.set(`notes-${req.user.id_user}`, allNotes);

      await this.cacheManager.set(`note-${cuid}`, result);

      return res.status(200).json(result);
    }
  }

  @Delete('/delete/:cuid')
  @ApiBearerAuth('access-token')
  @ApiNoContentResponse({
    description: 'Anotação deletada com sucesso.',
  })
  @ApiUnauthorizedResponse({
    description: new UnauthorizedException().message,
    type: AllExceptionsFilterDTO,
  })
  async deleteNote(
    @Param('cuid') cuid: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response | AllExceptionsFilterDTO> {
    if (!req.user) throw new NotAuthenticatedException();

    const result = await this.deleteNoteUseCase.execute(cuid, req.user.id_user);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    }
    await this.cacheManager.del(`note-${cuid}`);

    const allNotes = await this.browseNotesUseCase.execute(req.user.id_user);

    await this.cacheManager.set(`notes-${req.user.id_user}`, allNotes);

    return res.status(204).send();
  }
}
