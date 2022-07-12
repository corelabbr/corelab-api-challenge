import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class FindOneVehicleUseCase {
  constructor(private readonly vehicleRepo: IVehicleRepository) {}

  async execute(id: number): Promise<IVehicle> {
    const response = await this.vehicleRepo.findOne(id);

    if (!response) {
      throw new Error('Vehicle not found');
    }

    return response;
  }
}
