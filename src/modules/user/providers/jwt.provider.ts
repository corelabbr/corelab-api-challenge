import { Injectable } from '@nestjs/common';
import { sign, JwtPayload, verify } from 'jsonwebtoken';
import { authConfig } from '../config/auth.config';
import { JWTProviderInterface } from '../domain/providers/jwt.provider';
import { JWTProviderDTO, JWTValidateDTO } from '../dto/JWTProvider.dto';

const { expiresIn: configExpiresIn, secret: configSecret } = authConfig.token;

@Injectable()
export class JWTProvider implements JWTProviderInterface {
  public generate({
    payload,
    secret = configSecret,
    expiresIn = configExpiresIn,
  }: JWTProviderDTO): string {
    const token = sign(payload, secret, {
      expiresIn,
    });

    return token;
  }
  public validate({ token, secret }: JWTValidateDTO): JwtPayload | string {
    const decoded = verify(token, secret);
    return decoded;
  }
}
