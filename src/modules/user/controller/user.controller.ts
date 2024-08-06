import { Body, Controller, Get, HttpException, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { CreateUserRequestDTO, CreateUserResponseDTO } from '../domain/requests/CreateUser.request.dto';
import { EmailAlreadyRegisteredException } from '../domain/errors/EmailAlreadyRegistered.exception';
import { AllExceptionsFilterDTO } from '../../../shared/domain/dtos/errors/AllException.filter.dto';
import { UnprocessableDataException } from '../../../shared/domain/errors/UnprocessableData.exception';
import { CommonException } from '../../../shared/domain/errors/Common.exception';
import { UsernameAlreadyRegisteredException } from '../domain/errors/UsernameAlreadyRegistered.exception';
import { Request, Response } from 'express';
import { UserNotFoundException } from '../domain/errors/UserNotFound.exception';
import { InvalidCredentialsException } from '../domain/errors/InvalidCredentials.exception';
import { LoginUserBodyDTO, LoginUserResponseDTO } from '../domain/requests/LoginUser.request.dto';
import { NotAuthenticatedException } from '../../../shared/domain/errors/NotAuthenticated.exception';
import { HomeDataResponseDTO } from '../domain/requests/HomeData.request.dto';

@Controller('user')
@ApiTags('Usuário')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiResponse({
    status: 200,
    description: 'Usuário criado com sucesso.',
    type: CreateUserResponseDTO,
  })
  @ApiResponse({
    status: new EmailAlreadyRegisteredException().getStatus(),
    description: new EmailAlreadyRegisteredException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new UsernameAlreadyRegisteredException().getStatus(),
    description: new UsernameAlreadyRegisteredException().message,
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
  async register(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: CreateUserRequestDTO,
  ): Promise<CreateUserResponseDTO | AllExceptionsFilterDTO> {
    if (req.user) throw new UnauthorizedException();

    const result = await this.userService.register(body);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(200).json(result);
    }
  }

  @Post('login')
  @ApiResponse({
    status: 200,
    description: 'Usuário logado com sucesso.',
    type: CreateUserResponseDTO,
  })
  @ApiResponse({
    status: new UserNotFoundException().getStatus(),
    description: new UserNotFoundException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new InvalidCredentialsException().getStatus(),
    description: new InvalidCredentialsException().message,
    type: AllExceptionsFilterDTO,
  })
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() body: LoginUserBodyDTO,
  ): Promise<LoginUserResponseDTO | AllExceptionsFilterDTO> {
    if (req.user) throw new UnauthorizedException();

    const result = await this.userService.login(body);

    if (result instanceof HttpException) {
      return res.status(result.getStatus()).json({
        message: result.message,
        status: result.getStatus(),
      });
    } else {
      return res.status(200).json(result);
    }
  }

  @Get('home-data')
  @ApiBearerAuth('user-token')
  @ApiResponse({
    status: new NotAuthenticatedException().getStatus(),
    description: new UnauthorizedException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: new CommonException().getStatus(),
    description: new CommonException().message,
    type: AllExceptionsFilterDTO,
  })
  @ApiResponse({
    status: 300,
    description: 'Dados trazidos com sucesso.',
    type: HomeDataResponseDTO,
  })
  async homeData(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<HomeDataResponseDTO | AllExceptionsFilterDTO> {
    const user = req.user;

    if (!user) {
      return res.status(new NotAuthenticatedException().getStatus()).json({
        message: new NotAuthenticatedException().message,
        status: new NotAuthenticatedException().getStatus(),
      });
    }

    const result = await this.userService.homeData(user.id);

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
