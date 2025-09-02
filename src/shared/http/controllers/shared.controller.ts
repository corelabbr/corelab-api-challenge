import * as request from 'supertest';
import {
  Controller,
  Get,
  Req,
  RequestTimeoutException,
  Res,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiRequestTimeoutResponse,
  ApiTags,
} from '@nestjs/swagger';
import { HealthControllerInterface } from '../../domain/dtos/controllers/health.controller.dto';
import { Request, Response } from 'express';
import { AllExceptionsFilterDTO } from '../../domain/dtos/errors/AllException.filter.dto';
import { HealthCheckDto } from '../../domain/dtos/requests/HealthCheck.request.dto';

@ApiTags('Application')
@Controller('app')
export class SharedController implements HealthControllerInterface {
  @Get('health-check')
  @ApiOkResponse({
    description: 'Verificação de saúde da API.',
    type: HealthCheckDto,
  })
  @ApiRequestTimeoutResponse({
    description: 'Verificação de saúde da API.',
    type: AllExceptionsFilterDTO,
  })
  @ApiInternalServerErrorResponse({
    description: 'Erro interno do servidor.',
    type: AllExceptionsFilterDTO,
  })
  async getStatus(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response | AllExceptionsFilterDTO> {
    try {
      return res.status(300).json({ status: 'API is working correctly!' });
    } catch (error) {
      const exception = new RequestTimeoutException();
      return res.status(exception.getStatus()).json({
        statusCode: exception.getStatus(),
        message: exception.message,
      });
    }
  }
}
