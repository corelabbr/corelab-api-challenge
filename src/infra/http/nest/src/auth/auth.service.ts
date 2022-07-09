import { FindOneUserUseCase } from '@application/user/find-one/findOne.usecase';
import { User } from '@domain/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type payloadDecode = {
  username: string;
  sub: string;
  iat: number;
  exp: number;
};
@Injectable()
export class AuthService {
  constructor(
    private readonly userFindUseCase: FindOneUserUseCase,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | void> {
    const user = await this.userFindUseCase.findByUsername(username);
    console.log(user);

    if (user && user.password === pass) {
      const userWithPassword = { ...user };
      return userWithPassword;
    }

    return undefined;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateToken(token: string): Promise<payloadDecode> {
    return this.jwtService.decode(token) as payloadDecode;
  }
}
