import { Injectable, NestMiddleware } from '@nestjs/common';
import { JWTProvider } from '../providers/jwt.provider';
import { NextFunction, Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { NotAuthenticatedException } from '../../../shared/domain/errors/NotAuthenticated.exception';
import { BadTokenEception } from '../../../shared/domain/errors/BadToken.exception';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private jwtProvider: JWTProvider) {}
  async use(req: Request, _res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;

    if (authHeaders) {
      const token = authHeaders.replace(/Bearer /, '');

      try {
        const decoded = this.jwtProvider.validate({
          token,
          secret: String(process.env.JWT_KEY),
        });

        const { id, role } = decoded as JwtPayload;

        req.user = {
          id,
          role,
        };

        next();
      } catch (error) {
        throw new BadTokenEception();
      }
    } else {
      throw new NotAuthenticatedException();
    }
  }
}
