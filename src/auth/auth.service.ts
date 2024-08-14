import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.validate(username, password);
    if (user) {
      const result = {
        id: user.id,
        username: user.username,
      };
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, username: user.username };
    const token = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });
    return { token };
  }
}
