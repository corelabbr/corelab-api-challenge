import { User } from '@domain/entities/user.entity';
import { IUsersRepository } from '@domain/interfaces/user.repository';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class SetFavoriteVehicleUseCase {
  constructor(
    private readonly userRepository: IUsersRepository,
    private readonly vehicleRepository: IVehicleRepository,
  ) {}

  async execute(idVehicle: number, { id }: User): Promise<void> {
    const user = await this.userRepository.findById(id);
    console.log(user);

    const vehicle = await this.vehicleRepository.findOne(idVehicle);
    user.favorites.push(vehicle);
    await this.userRepository.save(user);
  }
}
