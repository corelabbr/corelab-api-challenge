import { IVehicle } from '@domain/entities/vehicle.entity';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { CreateVehicleUseCase } from './create.usecase';

describe('Test Repository Vehicles', () => {
  it('should be able to create a new vehicle', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new CreateVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    };

    await useCase.execute(vehicle);
    expect(vehicleRepository.vehicles).toHaveLength(1);
  });

  it('should be able to create a 2 new vehicles', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new CreateVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    };

    await useCase.execute(vehicle);
    await useCase.execute({
      ...vehicle,
      color: '#F3F',
    });

    expect(vehicleRepository.vehicles).toHaveLength(2);
  });

  it('should be able create vehicle with property invalid', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new CreateVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    };

    await expect(
      useCase.execute({
        ...vehicle,
        color: 'F3F',
      }),
    ).rejects.toThrowError('Color must be a hexadecimal color');
  });
});
