import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class FindByUserVehiclesUseCase {
  constructor(private readonly vehicleRepo: IVehicleRepository) {}

  async execute(id: number): Promise<{ total: number; data: IVehicle[] }> {
    const response = await this.vehicleRepo.findByUser(id);

    if (!response) {
      throw new Error('Vehicle not found');
    }

    return response;
  }
}
