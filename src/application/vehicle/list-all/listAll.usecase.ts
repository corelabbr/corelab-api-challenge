import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class ListAllVehiclesUseCase {
  constructor(private vehicleRepo: IVehicleRepository) {}

  async all(): Promise<{ total: number; data: IVehicle[] }> {
    return this.vehicleRepo.findAll();
  }

  async favorite(id: number): Promise<{ total: number; data: IVehicle[] }> {
    return this.vehicleRepo.findFavorite(id);
  }
}
