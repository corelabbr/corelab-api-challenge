import { Injectable } from '@nestjs/common';
import { sign, JwtPayload, verify } from 'jsonwebtoken';
import { JWTProviderDTO, JWTValidateDTO } from '../../dto/JWTProvider.dto';
import { JWTProviderInterface } from '../../domain/providers/JWT.provider';

@Injectable()
export class JWTProvider implements JWTProviderInterface {
  public generate({ payload }: JWTProviderDTO): string {
    const token = sign(payload, String(process.env.APP_SECRET), {
      expiresIn: '30d',
    });

    return token;
  }
  public validate({ token, secret }: JWTValidateDTO): JwtPayload | string {
    const decoded = verify(token, secret);
    return decoded;
  }
}
