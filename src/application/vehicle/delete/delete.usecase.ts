import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class DeleteVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  async execute(id: number): Promise<void> {
    return this.vehicleRepository.delete(id);
  }
}
