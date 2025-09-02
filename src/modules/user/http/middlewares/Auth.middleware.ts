import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JWTProvider } from '../../infra/providers/jwt.provider';
import { NotAuthenticatedException } from '../../../../shared/domain/errors/NotAuthenticated.exception';
import { BadTokenEception } from '../../../../shared/domain/errors/BadToken.exception';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private jwtProvider: JWTProvider) {}
  use(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const userIp =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    if (!authHeader) {
      throw new NotAuthenticatedException();
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = this.jwtProvider.validate({
        token,
        secret: String(process.env.APP_SECRET),
      });

      req.userIp = userIp;

      if (decoded.user) {
        req.user = {
          id_user: decoded.user.id_user,
          name: decoded.user.name,
        };
      }

      return next();
    } catch (error) {
      throw new BadTokenEception();
    }
  }
}
