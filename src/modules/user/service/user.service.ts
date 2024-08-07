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
import {
  LoginUserBodyDTO,
  LoginUserResponseDTO,
} from '../domain/requests/LoginUser.request.dto';
import { InvalidCredentialsException } from '../domain/errors/InvalidCredentials.exception';
import { UserNotFoundException } from '../domain/errors/UserNotFound.exception';
import { HomeDataResponseDTO } from '../domain/requests/HomeData.request.dto';

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

    return {
      user: {
        id: user.id_user,
        username: user.username,
      },
      token: this.jwtProvider.generate({
        payload: {
          id: user.id_user,
        },
      }),
    };
  }

  /* This will compare the credentials with the ones in the database and give the auth token it the password is correct */
  async login(
    credentials: LoginUserBodyDTO,
  ): Promise<
    LoginUserResponseDTO | UserNotFoundException | InvalidCredentialsException
  > {
    if (!credentials.email || !credentials.inserted_password)
      throw new InvalidCredentialsException();

    const user = await this.userRepository.findByEmail(credentials.email);

    if (!user) throw new UserNotFoundException();

    const isPasswordValid: boolean = await this.hashProvider.compare(
      credentials.inserted_password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    } else {
      const token = this.jwtProvider.generate({
        payload: {
          id: user.id_user,
        },
        expiresIn: '7d',
      });

      return {
        user: {
          id: user.id_user,
          name: user.username,
        },
        token: token,
      };
    }
  }

  /* Validating the user's existance. This will be used as an auxiliary endpoint for user data and session in the front-end. */
  async homeData(
    user_id: number,
  ): Promise<HomeDataResponseDTO | UserNotFoundException> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new UserNotFoundException();

    return {
      user: {
        id: user.id_user,
        username: user.username,
      },
    };
  }
}
