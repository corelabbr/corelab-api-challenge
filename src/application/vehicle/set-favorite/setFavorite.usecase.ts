import { Vehicle } from '@domain/entities/vehicle.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class SetFavoriteVehicleUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  private isFavorite(favorites: Vehicle[], vehicle: Vehicle): boolean {
    return favorites.some((favorite) => favorite.id === vehicle.id);
  }

  async execute(idVehicle: number, idUser: number): Promise<void> {
    const user = await this.userRepository.findById(idUser);
    const vehicle = await this.vehicleRepository.findOne(idVehicle);

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }

    if (this.isFavorite(user.favorites, vehicle)) {
      user.favorites = user.favorites.filter(
        (favorite) => favorite.id !== vehicle.id,
      );
    } else {
      user.favorites.push(vehicle);
    }
    await this.userRepository.save(user);
  }
}
