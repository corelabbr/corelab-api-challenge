import { IUsersRepository } from '@domain/interfaces/user.repository';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class SetFavoriteVehicleUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(idVehicle: number, idUser: number): Promise<void> {
    const user = await this.userRepository.findById(idUser);
    const vehicle = await this.vehicleRepository.findOne(idVehicle);

    if (!vehicle) {
      throw new Error('Vehicle not found');
    }
    user.favorites.push(vehicle);
    await this.userRepository.save(user);
  }
}
