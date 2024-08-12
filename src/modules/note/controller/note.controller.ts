import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindNoteResponseDTO,
  FindNotesResponseDTO,
} from '../domain/requests/FindNotes.request.dto';
import { NotAuthenticatedException } from '../../../shared/domain/errors/NotAuthenticated.exception';
import { AllExceptionsFilterDTO } from '../../../shared/domain/dtos/errors/AllException.filter.dto';
import { BadTokenEception } from '../../../shared/domain/errors/BadToken.exception';
import { CommonException } from '../../../shared/domain/errors/Common.exception';
import { Request, Response } from 'express';
import { PaginationDto } from '../../../shared/domain/dtos/providers/Pagination.dto';
import { NoteNotFoundException } from '../domain/errors/NoteNotFound.exception';
import {
  CreateNoteRequestDTO,
  CreateNoteResponseDTO,
} from '../domain/requests/CreateNote.request.dto';
import { UnprocessableDataException } from '../../../shared/domain/errors/UnprocessableData.exception';
import {
  EditNoteRequestDTO,
  EditNoteResponseDTO,
} from '../domain/requests/EditNote.request.dto';

@Controller('note')
@ApiTags('Notas')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('browse')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 200,
    description: 'Notas Trazidas com Sucesso',
    type: FindNotesResponseDTO,
  })
  @ApiResponse({
    status: new NotAuthenticatedException().getStatus(),
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new BadTokenEception().getStatus(),
    description: new BadTokenEception().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async browse(
    @Req() req: Request,
    @Res() res: Response,
    @Query() paginationDto: PaginationDto,
  ): Promise<FindNotesResponseDTO | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    /* Getting the query params to get the page index */
    const { page } = paginationDto;

    const result = await this.noteService.getNotes(user.id, page);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(200).json(result);
    }
  }

  @Get('find/:id')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 200,
    description: 'Nota Trazida com Sucesso',
    type: FindNoteResponseDTO,
  })
  @ApiResponse({
    status: new NoteNotFoundException().getStatus(),
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new NotAuthenticatedException().getStatus(),
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new BadTokenEception().getStatus(),
    description: new BadTokenEception().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async findNote(
    @Param('id') noteId: number,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<FindNoteResponseDTO | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.noteService.getNoteById(user.id, noteId);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(200).json(result);
    }
  }

  @Post('create')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 201,
    description: 'Nota Criada com Sucesso',
    type: CreateNoteResponseDTO,
  })
  @ApiResponse({
    status: new NotAuthenticatedException().getStatus(),
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new BadTokenEception().getStatus(),
    description: new BadTokenEception().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new UnprocessableDataException().getStatus(),
    description: new UnprocessableDataException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async createNote(
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: CreateNoteRequestDTO,
  ): Promise<CreateNoteResponseDTO | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.noteService.createNote(user.id, data);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(201).json(result);
    }
  }

  @Patch('edit/:id')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 201,
    description: 'Nota Editada com Sucesso',
    type: EditNoteResponseDTO,
  })
  @ApiResponse({
    status: new NoteNotFoundException().getStatus(),
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new NotAuthenticatedException().getStatus(),
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new BadTokenEception().getStatus(),
    description: new BadTokenEception().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new UnprocessableDataException().getStatus(),
    description: new UnprocessableDataException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async editNote(
    @Param('id') noteId: number,
    @Req() req: Request,
    @Res() res: Response,
    @Body() data: EditNoteRequestDTO,
  ): Promise<CreateNoteResponseDTO | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.noteService.editNote(user.id, noteId, data);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(201).json(result);
    }
  }

  @Delete('delete/:id')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 204,
    description: 'Nota Deletada com Sucesso',
  })
  @ApiResponse({
    status: new NoteNotFoundException().getStatus(),
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new NotAuthenticatedException().getStatus(),
    description: new NotAuthenticatedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new BadTokenEception().getStatus(),
    description: new BadTokenEception().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async deleteNote(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') noteId: number,
  ): Promise<void | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.noteService.deleteNote(user.id, noteId);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(204).json();
    }
  }
}
