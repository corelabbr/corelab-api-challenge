import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicle } from './vehicle.entity';

export interface IVehicleRepository {
  findAll(): Promise<{ total: number; data: Vehicle[] }>;
  findOne(id: number): Promise<Vehicle>;
  findFavorite(id: number): Promise<{ total: number; data: Vehicle[] }>;
  findByUser(id: number): Promise<{ total: number; data: Vehicle[] }>;
  save(vehicle: Vehicle): Promise<IVehicle>;
  update(vehicle: IVehicle): Promise<IVehicle>;
  delete(id: number): Promise<void>;
}
