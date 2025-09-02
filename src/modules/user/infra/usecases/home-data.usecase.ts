import { Inject } from '@nestjs/common';
import { UseCaseInterface } from '../../../../shared/domain/protocols/UseCase.protocol';
import { UserRepository } from '../db/repositories/user.repository';
import { HomeDataResponseDTO } from '../../domain/dtos/requests/HomeData.request.dto';
import { UserNotFoundException } from '../../domain/dtos/errors/UserNotFound.exception';

export class HomeDataUsecase implements UseCaseInterface {
  constructor(
    @Inject()
    private userRepository: UserRepository,
  ) {}

  async execute(
    user_id: string,
  ): Promise<HomeDataResponseDTO | UserNotFoundException> {
    const user = await this.userRepository.findById(user_id);

    if (!user || !user.id_user || !user.name)
      return new UserNotFoundException();

    return {
      user: {
        id: user.id_user,
        name: user.name,
      },
    };
  }
}
