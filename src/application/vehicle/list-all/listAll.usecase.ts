import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class ListAllVehiclesUseCase {
  constructor(private vehicleRepo: IVehicleRepository) {}

  async execute(): Promise<{ total: number; data: IVehicle[] }> {
    return this.vehicleRepo.findAll();
  }
}
