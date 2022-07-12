import { CreateUserUseCase } from '@application/user/create/create.usecase';
import { FindOneUserUseCase } from '@application/user/find-one/findOne.usecase';
import { IUsersRepository } from '@domain/interfaces/user.repository';
import { UserTypeormRepository } from '@infra/db/typeorm/user-typeorm.repository';
import { UserEntityTypeorm } from '@infra/db/typeorm/user.schema';
import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const usersProviders = [
  {
    provide: UserTypeormRepository,
    useFactory: (dataSource: DataSource) =>
      new UserTypeormRepository(dataSource.getRepository(UserEntityTypeorm)),
    inject: [getDataSourceToken()],
  },

  {
    provide: CreateUserUseCase,
    useFactory: (repository: IUsersRepository) =>
      new CreateUserUseCase(repository),
    inject: [UserTypeormRepository],
  },

  {
    provide: FindOneUserUseCase,
    useFactory: (repository: IUsersRepository) =>
      new FindOneUserUseCase(repository),
    inject: [UserTypeormRepository],
  },
];
