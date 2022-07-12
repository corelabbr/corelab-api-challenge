import { User } from '@domain/entities/user.entity';
import { Vehicle } from '@domain/entities/vehicle.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';
import { UserInMemoryRepository } from '@infra/db/memory/UserInMemory.repository';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { SetFavoriteVehicleUseCase } from './setFavorite.usecase';

describe('SetFavoriteUseCase', () => {
  let setFavoriteUseCase: SetFavoriteVehicleUseCase;
  let vehicleRepository: IVehicleRepository;
  let userRepository: IUsersRepository;
  let vehicle: Vehicle;
  let userMock: User;

  beforeEach(async () => {
    vehicleRepository = new VehicleInMemoryRepository();
    userRepository = new UserInMemoryRepository();
    setFavoriteUseCase = new SetFavoriteVehicleUseCase(
      userRepository,
      vehicleRepository,
    );

    userMock = await userRepository.save({
      name: 'John Doe',
      username: '',
      password: '',
      vehicles: [],
      favorites: [],
    });

    vehicle = new Vehicle({
      id: 1,
      name: 'Fusca',
      description: '',
      price: 0,
      color: 'black',
      year: 2020,
      brand: 'Volkswagen',
      plate: 'AAA-1111',
      user: { id: 1 },
      createdAt: new Date(),
    });
    await vehicleRepository.save(vehicle);
  });

  it('should set favorite', async () => {
    await setFavoriteUseCase.execute(vehicle.id, userMock.id);
    const user = await userRepository.findById(userMock.id);

    expect(user.favorites).toHaveLength(1);
    expect(user.favorites[0].id).toBe(vehicle.id);
  });

  it('should not set favorite if vehicle not found', async () => {
    expect(
      setFavoriteUseCase.execute(vehicle.id + 1, userMock.id),
    ).rejects.toThrowError('Vehicle not found');
  });
});
