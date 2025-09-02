import { Request, Response } from 'express';
import { AllExceptionsFilterDTO } from '../../../../shared/domain/dtos/errors/AllException.filter.dto';

export interface HealthControllerInterface {
  getStatus(
    req: Request,
    res: Response,
  ): Promise<Response | AllExceptionsFilterDTO>;
}
