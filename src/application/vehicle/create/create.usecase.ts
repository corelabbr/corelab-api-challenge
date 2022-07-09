import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class CreateVehicleUseCase {
  constructor(private vehicleRepo: IVehicleRepository) {}

  async execute(vehicle: IVehicle): Promise<IVehicle> {
    const newVehicle = new Vehicle(vehicle);

    return this.vehicleRepo.save(newVehicle);
  }
}
