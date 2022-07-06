import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class SetFavoriteVehicleUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  async execute(id: number): Promise<IVehicle> {
    const vehicle = await this.vehicleRepository.findOne(id);
    vehicle.setFavorite();

    return this.vehicleRepository.save(vehicle);
  }
}
