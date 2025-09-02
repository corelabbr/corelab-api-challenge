import { Inject, UnprocessableEntityException } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { EmailAlreadyRegisteredException } from '../../domain/dtos/errors/EmailAlreadyRegistered.exception';
import { UserRepository } from '../db/repositories/user.repository';
import { HashProvider } from '../providers/hash.provider';
import { JWTProvider } from '../providers/jwt.provider';
import {
  CreateUserBodyDTO,
  CreateUserResponseDTO,
} from '../../domain/dtos/requests/CreateUser.request.dto';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../../../../shared/infra/utils/functions/validators';
import { UnprocessableDataException } from '../../../../shared/domain/errors/UnprocessableData.exception';

export class CreateUserUseCase implements UseCaseInterface {
  constructor(
    private hashProvider: HashProvider,
    private jwtProvider: JWTProvider,
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(
    data: CreateUserBodyDTO,
  ): Promise<
    | CreateUserResponseDTO
    | EmailAlreadyRegisteredException
    | UnprocessableEntityException
  > {
    if (!validateName(data.name))
      throw new UnprocessableDataException('Nome inválido');

    if (!validateEmail(data.email))
      throw new UnprocessableDataException('E-mail inválido');

    if (!validatePassword(data.password))
      throw new UnprocessableDataException('Senha inválida');

    await this.userRepository
      .findByEmail(data.email)
      .then((emailAlreadyRegisteredByUser) => {
        if (emailAlreadyRegisteredByUser)
          throw new EmailAlreadyRegisteredException();
      });

    if (
      !data.password ||
      !data.password_confirmation ||
      data.password !== data.password_confirmation
    )
      throw new UnprocessableEntityException();

    delete data.password_confirmation;

    data.password = await this.hashProvider.hash(data.password);

    const user = await this.userRepository.create(data);

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
      id: user.id_user,
    };
  }
}
