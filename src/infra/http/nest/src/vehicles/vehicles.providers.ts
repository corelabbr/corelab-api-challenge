import { CreateVehicleUseCase } from '@application/vehicle/create/create.usecase';
import { DeleteVehicleUseCase } from '@application/vehicle/delete/delete.usecase';
import { FindOneVehicleUseCase } from '@application/vehicle/find-one/findOne.usecase';
import { ListAllVehiclesUseCase } from '@application/vehicle/list-all/listAll.usecase';
import { SetFavoriteVehicleUseCase } from '@application/vehicle/set-favorite/setFavorite.usecase';
import { UpdateVehicleUseCase } from '@application/vehicle/update/update.usecase';
import { IUsersRepository } from '@domain/interfaces/user.repository';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { UserTypeormRepository } from '@infra/db/typeorm/user-typeorm.repository';
import { UserEntityTypeorm } from '@infra/db/typeorm/user.schema';
import { VehicleTypeormRepository } from '@infra/db/typeorm/vehicle-typeorm.repository';
import { VehicleEntityTypeorm } from '@infra/db/typeorm/vehicle.schema';

import { getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export const vehiclesProviders = [
  {
    provide: VehicleTypeormRepository,
    useFactory: (dataSource: DataSource) =>
      new VehicleTypeormRepository(
        dataSource.getRepository(UserEntityTypeorm),
        dataSource.getRepository(VehicleEntityTypeorm),
      ),
    inject: [getDataSourceToken()],
  },
  {
    provide: VehicleInMemoryRepository,
    useClass: VehicleInMemoryRepository,
  },
  {
    provide: CreateVehicleUseCase,
    useFactory: (repository: IVehicleRepository) =>
      new CreateVehicleUseCase(repository),
    inject: [VehicleTypeormRepository],
  },
  {
    provide: ListAllVehiclesUseCase,
    useFactory: (repository: IVehicleRepository) =>
      new ListAllVehiclesUseCase(repository),
    inject: [VehicleTypeormRepository],
  },
  {
    provide: FindOneVehicleUseCase,
    useFactory: (repository: IVehicleRepository) =>
      new FindOneVehicleUseCase(repository),
    inject: [VehicleTypeormRepository],
  },
  {
    provide: DeleteVehicleUseCase,
    useFactory: (repository: IVehicleRepository) =>
      new DeleteVehicleUseCase(repository),
    inject: [VehicleTypeormRepository],
  },
  {
    provide: UpdateVehicleUseCase,
    useFactory: (repository: IVehicleRepository) =>
      new UpdateVehicleUseCase(repository),
    inject: [VehicleTypeormRepository],
  },
  {
    provide: SetFavoriteVehicleUseCase,
    useFactory: (
      vehicleRepository: IVehicleRepository,
      userRepository: IUsersRepository,
    ) => new SetFavoriteVehicleUseCase(userRepository, vehicleRepository),
    inject: [VehicleTypeormRepository, UserTypeormRepository],
  },
];
