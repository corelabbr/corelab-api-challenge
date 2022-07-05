import { IVehicle } from '@domain/entities/vehicle.entity';

export interface IVehicleRepository {
  findAll(): Promise<IVehicle[]>;
  findOne(id: number): Promise<IVehicle>;
  create(vehicle: IVehicle): Promise<IVehicle>;
  update(vehicle: IVehicle): Promise<IVehicle>;
  delete(id: number): Promise<void>;
}
