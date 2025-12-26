import { BadRequestException, Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { CredentialsService } from 'src/credentials/credentials.service';
import { WrongCredentialsException } from 'src/exceptions/wrong-credentials.exception';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from 'src/users/dto/create_user.dto';

type SigInUserType = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private credentialsService: CredentialsService,
    private usersService: UsersService,
  ) {}

  async signIn({ email, password }: SigInUserType): Promise<any> {
    const credential =
      await this.credentialsService.findCredentialByEmail(email);

    const user = await this.usersService.findOne(credential.credentialableId);

    if (!credential) throw new WrongCredentialsException();

    if (await argon2.verify(credential.passwordHash, password)) {
      const payload = {
        sub: credential.id,
        id: credential.credentialableId,
      };
      return {
        user: {
          id: credential.credentialableId,
          name: user.fullName,
          email: credential.email,
          accessToken: await this.jwtService.signAsync(payload),
        },
      };
    } else {
      throw new WrongCredentialsException();
    }
  }

  async signUp(createUserDto: CreateUserDTO): Promise<any> {
    const existingCredential =
      await this.credentialsService.findCredentialByEmail(createUserDto.email);

    if (existingCredential) {
      throw new BadRequestException('Usuário com este email já existe!');
    }
    return await this.usersService.create(createUserDto);
  }
}
