import { Inject, UnauthorizedException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { UserRepository } from '../db/repositories/user.repository';
import { JWTProvider } from '../providers/jwt.provider';
import {
  UserLoginRequestDTO,
  UserLoginResponseDTO,
} from '../../domain/dtos/requests/UserLogin.request.dto';
import { InvalidCredentialsException } from '../../domain/dtos/errors/InvalidCredentials.exception';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';

export class UserLoginUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private userRepository: UserRepository,
    private readonly jwtProvider: JWTProvider,
  ) {}

  async execute(
    data: UserLoginRequestDTO,
    ip: string,
  ): Promise<
    | UserLoginResponseDTO
    | InvalidCredentialsException
    | UnauthorizedException
    | UnprocessableDataException
  > {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user || !user.id_user || !user.name)
      throw new InvalidCredentialsException();

    const isPasswordValid = await this.userRepository.comparePassword(
      user.id_user,
      data.password,
    );

    if (!isPasswordValid) throw new InvalidCredentialsException();

    const token = this.jwtProvider.generate({
      payload: {
        user: {
          id_user: user.id_user,
          name: user.name,
        },
      },
    });

    return {
      token,
      user: {
        id_user: user.id_user,
        name: user.name,
      },
    };
  }
}
