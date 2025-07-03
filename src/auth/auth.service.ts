import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthenticatedUser } from './dto/authenticated-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<AuthenticatedUser> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }
    const { ...result } = user;
    return result as AuthenticatedUser;
  }

  async login(user: AuthenticatedUser) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
