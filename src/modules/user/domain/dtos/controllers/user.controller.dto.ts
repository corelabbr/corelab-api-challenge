import { Request, Response } from 'express';
import { AllExceptionsFilterDTO } from '../../../../../shared/domain/dtos/errors/AllException.filter.dto';
import { CreateUserBodyDTO } from '../requests/CreateUser.request.dto';
import { UserLoginRequestDTO } from '../requests/UserLogin.request.dto';

export interface UserControllerInterface {
  createUser(
    req: Request,
    res: Response,
    createUserBody: CreateUserBodyDTO,
  ): Promise<Response | AllExceptionsFilterDTO>;
  login(
    data: UserLoginRequestDTO,
    req: Request,
    res: Response,
  ): Promise<Response>;
  homeData(
    req: Request,
    res: Response,
  ): Promise<Response | AllExceptionsFilterDTO>;
}
