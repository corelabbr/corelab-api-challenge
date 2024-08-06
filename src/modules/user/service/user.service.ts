import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
} from '../domain/requests/CreateUser.request.dto';
import { EmailAlreadyRegisteredException } from '../domain/errors/EmailAlreadyRegistered.exception';
import { UnprocessableDataException } from '../../../shared/domain/errors/UnprocessableData.exception';
import { emailValidate } from '../../../shared/utils/email.validator';
import { passwordValidate } from '../../../shared/utils/password.validator';
import { UsernameAlreadyRegisteredException } from '../domain/errors/UsernameAlreadyRegistered.exception';
import { HashProvider } from '../providers/hash.provider';
import { JWTProvider } from '../providers/jwt.provider';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashProvider: HashProvider,
    private readonly jwtProvider: JWTProvider,
  ) {}

  /* This service registers the user in the database if all the criterias are met */
  async register(
    credentials: CreateUserRequestDTO,
  ): Promise<
    | CreateUserResponseDTO
    | EmailAlreadyRegisteredException
    | UnprocessableDataException
  > {
    if (
      !emailValidate(credentials.email) ||
      credentials.email.length < 10 ||
      credentials.email.length > 50
    )
      throw new UnprocessableDataException('Email inválido.');

    if (!passwordValidate(credentials.password))
      throw new UnprocessableDataException('Senha inválida.');

    await this.userRepository
      .findByUsername(credentials.username)
      .then((foundUser) => {
        if (foundUser) throw new UsernameAlreadyRegisteredException();
      });

    await this.userRepository
      .findByEmail(credentials.email)
      .then((foundUser) => {
        if (foundUser) throw new EmailAlreadyRegisteredException();
      });

    const user = await this.userRepository.save({
      username: credentials.username,
      email: credentials.email,
      password: await this.hashProvider.hash(credentials.password),
    });

    const token = this.jwtProvider.generate({
      payload: {
        id: user.id_user,
      },
    });

    return {
      user: {
        id: user.id_user,
        username: user.username,
      },
      token: token,
    };
  }
}
