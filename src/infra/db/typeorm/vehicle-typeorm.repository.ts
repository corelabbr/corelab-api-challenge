import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';
import { Repository } from 'typeorm';

export class VehicleTypeormRepository implements IVehicleRepository {
  constructor(private readonly ormRepo: Repository<Vehicle>) {}

  async findAll(): Promise<{ total: number; data: Vehicle[] }> {
    const [data, total] = await this.ormRepo.findAndCount();

    return { total, data };
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.ormRepo.findOne({ where: { id } });
  }

  async save(vehicle: IVehicle): Promise<IVehicle> {
    const newVehicle = this.ormRepo.create(vehicle);
    await this.ormRepo.save(newVehicle);

    return newVehicle;
  }

  async update(vehicle: Partial<IVehicle>): Promise<IVehicle> {
    const updatedVehicle = await this.ormRepo.save(vehicle);

    return updatedVehicle;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
