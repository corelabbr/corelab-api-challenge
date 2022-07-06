import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicle } from './vehicle.entity';

export interface IVehicleRepository {
  findAll(): Promise<{ total: number; data: Vehicle[] }>;
  findOne(id: number): Promise<Vehicle>;
  save(vehicle: Vehicle): Promise<IVehicle>;
  update(vehicle: Partial<Vehicle>): Promise<IVehicle>;
  delete(id: number): Promise<void>;
}
