import {
  Controller,
  Delete,
  HttpException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FavoriteService } from '../service/favorite.service';
import { NoteIsAlreadyFavoritedException } from '../domain/errors/NoteIsAlreadyFavorited.exception';
import { AllExceptionsFilterDTO } from '../../../shared/domain/dtos/errors/AllException.filter.dto';
import { NoteNotFoundException } from '../../note/domain/errors/NoteNotFound.exception';
import { NotAuthenticatedException } from '../../../shared/domain/errors/NotAuthenticated.exception';
import { BadTokenEception } from '../../../shared/domain/errors/BadToken.exception';
import { CommonException } from '../../../shared/domain/errors/Common.exception';
import { Request, Response } from 'express';

@Controller('note')
@ApiTags('Notas')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('favorite/:id')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 201,
    description: 'Nota Favoritada com Sucesso',
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
    status: new NoteIsAlreadyFavoritedException().getStatus(),
    description: new NoteIsAlreadyFavoritedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new NoteNotFoundException().getStatus(),
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async markAsFavorite(
    @Param('id') noteId: number,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.favoriteService.markAsFavorite(user.id, noteId);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(201).json(result);
    }
  }

  @Delete('unfavorite/:id')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: 204,
    description: 'Nota Desfavoritada com Sucesso',
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
    status: new NoteNotFoundException().getStatus(),
    description: new NoteNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  async unmarkAsFavorite(
    @Param('id') noteId: number,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.favoriteService.unmarkAsFavorite(user.id, noteId);

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
