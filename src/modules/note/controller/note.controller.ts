import { Controller, Get, HttpException, Param, Query, Req, Res } from '@nestjs/common';
import { NoteService } from '../service/note.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FindNoteResponseDTO, FindNotesResponseDTO } from '../domain/requests/FindNotes.request.dto';
import { NotAuthenticatedException } from '../../../shared/domain/errors/NotAuthenticated.exception';
import { AllExceptionsFilterDTO } from '../../../shared/domain/dtos/errors/AllException.filter.dto';
import { BadTokenEception } from '../../../shared/domain/errors/BadToken.exception';
import { CommonException } from '../../../shared/domain/errors/Common.exception';
import { Request, Response } from 'express';
import { PaginationDto } from '../../../shared/domain/dtos/providers/Pagination.dto';
import { NoteNotFoundException } from '../domain/errors/NoteNotFound.exception';

@Controller('note')
@ApiTags('Notas')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get('browse')
    @ApiBearerAuth('user-token')
    @ApiResponse({
        status: 200,
        description: 'Notas Trazidas com Sucesso',
        type: FindNotesResponseDTO
    })
    @ApiResponse({
        status: new NotAuthenticatedException().getStatus(),
        description: new NotAuthenticatedException().message,
        type: AllExceptionsFilterDTO
    })
    @ApiResponse({
        status: new BadTokenEception().getStatus(),
        description: new BadTokenEception().message,
        type: AllExceptionsFilterDTO
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
    ): Promise<FindNotesResponseDTO | AllExceptionsFilterDTO>   {
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

    @Get(':id')
    @ApiBearerAuth('user-token')
    @ApiResponse({
        status: 200,
        description: 'Nota Trazida com Sucesso',
        type: FindNoteResponseDTO
    })
    @ApiResponse({
        status: new NoteNotFoundException().getStatus(),
        description: new NoteNotFoundException().message,
        type: AllExceptionsFilterDTO
    })
    @ApiResponse({
        status: new NotAuthenticatedException().getStatus(),
        description: new NotAuthenticatedException().message,
        type: AllExceptionsFilterDTO
    })
    @ApiResponse({
        status: new BadTokenEception().getStatus(),
        description: new BadTokenEception().message,
        type: AllExceptionsFilterDTO
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
    ): Promise<FindNoteResponseDTO | AllExceptionsFilterDTO>    {
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
}
