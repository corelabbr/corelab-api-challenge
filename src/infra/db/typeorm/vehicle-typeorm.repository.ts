import { Vehicle } from '@domain/entities/vehicle.entity';
import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { IVehicleRepository } from '@domain/interfaces/vehicle.repository';
import { Repository } from 'typeorm';
import { UserEntityTypeorm } from './user.schema';
import { VehicleEntityTypeorm } from './vehicle.schema';

export class VehicleTypeormRepository implements IVehicleRepository {
  constructor(
    private readonly userRepo: Repository<UserEntityTypeorm>,
    private readonly vehicleRepo: Repository<VehicleEntityTypeorm>,
  ) {}

  async findByUser(id: number): Promise<{ total: number; data: Vehicle[] }> {
    const [data, total] = await this.vehicleRepo.findAndCount({
      where: { user: { id } },
      relations: ['user'],
    });
    return { total, data };
  }

  async findFavorite(id: number): Promise<{ total: number; data: Vehicle[] }> {
    const data = await this.userRepo.findOne({
      where: { id },
      relations: ['favorites'],
    });

    return { total: data.favorites.length, data: data.favorites };
  }

  async findAll(): Promise<{ total: number; data: Vehicle[] }> {
    const [data, total] = await this.vehicleRepo.findAndCount({
      relations: ['user'],
    });
    const vehicles = data.map((vehicle) => {
      vehicle.user.password = undefined;
      return vehicle;
    });
    console.log(vehicles);

    return { total, data: vehicles };
  }

  async findOne(id: number): Promise<Vehicle> {
    return this.vehicleRepo.findOne({ where: { id } });
  }

  async save(vehicle: IVehicle): Promise<IVehicle> {
    const newVehicle = this.vehicleRepo.create(vehicle);
    await this.vehicleRepo.save(newVehicle);

    return newVehicle;
  }

  async update(vehicle: Partial<IVehicle>): Promise<IVehicle> {
    const updatedVehicle = await this.vehicleRepo.save(vehicle);

    return updatedVehicle;
  }

  async delete(id: number): Promise<void> {
    await this.vehicleRepo.delete(id);
  }
}
