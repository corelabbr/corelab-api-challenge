import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class UpdateVehicleUseCase {
  constructor(private vehicleRepository: IVehicleRepository) {}

  private isPropertyEligible(vehicle: Partial<IVehicle>): boolean {
    return !Object.keys(vehicle).some(
      (key) =>
        key === 'id' || key === 'name' || key === 'year' || key === 'plate',
    );
  }
  async execute(id: number, vehicle: Partial<IVehicle>): Promise<IVehicle> {
    console.log(id, vehicle);

    const vehicleFound = await this.vehicleRepository.findOne(id);

    console.log('dfsfsdfdsfdsf');
    Object.assign(vehicleFound, vehicle);
    console.log(vehicleFound);

    return this.vehicleRepository.update(vehicleFound);
  }
}
