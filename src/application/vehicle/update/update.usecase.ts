import { IVehicle } from '@domain/entities/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class updateVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  private isPropertyEligible(vehicle: Partial<IVehicle>): boolean {
    return !Object.keys(vehicle).some(
      (key) =>
        key === 'id' || key === 'name' || key === 'year' || key === 'plate',
    );
  }
  async execute(id: number, vehicle: Partial<IVehicle>): Promise<IVehicle> {
    const vehicleFound = await this.vehicleRepository.findOne(id);
    if (!vehicleFound) {
      throw new Error('Vehicle not found');
    }

    if (Object.keys(vehicle).length === 0) {
      throw new Error('Vehicle properties cannot be updated');
    }

    if (!this.isPropertyEligible(vehicle)) {
      throw new Error('Vehicle properties cannot be updated');
    }
    Object.assign(vehicleFound, vehicle);
    return this.vehicleRepository.update(vehicleFound);
  }
}
