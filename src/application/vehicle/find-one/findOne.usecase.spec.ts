import { IVehicle } from '@domain/entities/vehicle.entity';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { findOneVehicleUseCase } from './findOne.usecase';

describe('FindOneVehicle', () => {
  it('should be able to find one vehicle', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new findOneVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    };
    vehicleRepository.create(vehicle);

    const response = await useCase.execute(vehicle.id);

    expect(response.name).toBe(vehicle.name);
    expect(response.year).toBe(vehicle.year);
    expect(response.color).toBe(vehicle.color);
    expect(response.price).toBe(vehicle.price);
    expect(response.plate).toBe(vehicle.plate);
  });

  it('should be able to find one vehicle - with no vehicle', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new findOneVehicleUseCase(vehicleRepository);

    expect(useCase.execute(1)).rejects.toThrowError('Vehicle not found');
  });
});
