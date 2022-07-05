import { IVehicle } from '@domain/entities/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';

export class VehicleInMemoryRepository implements IVehicleRepository {
  vehicles: IVehicle[] = [];

  async findAll(): Promise<{ total: number; data: IVehicle[] }> {
    return {
      total: this.vehicles.length,
      data: this.vehicles,
    };
  }
  async findOne(id: number): Promise<IVehicle> {
    return this.vehicles.find((vehicle) => vehicle.id === id);
  }
  async create(vehicle: IVehicle): Promise<IVehicle> {
    vehicle.id = this.vehicles.length + 1;
    this.vehicles.push(vehicle);
    return vehicle;
  }
  async update(vehicle: IVehicle): Promise<IVehicle> {
    const index = this.vehicles.findIndex((v) => v.id === vehicle.id);
    this.vehicles[index] = vehicle;
    return vehicle;
  }
  async delete(id: number): Promise<void> {
    if (!this.vehicles.find((vehicle) => vehicle.id === id)) {
      throw new Error('Vehicle not found');
    }
    this.vehicles = this.vehicles.filter((vehicle) => vehicle.id !== id);
  }
}
