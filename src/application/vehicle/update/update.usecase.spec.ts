import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { UpdateVehicleUseCase } from './update.usecase';

describe('UpdateVehicle', () => {
  it('should be able to update one vehicle', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new UpdateVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
      description: 'sds',
    };
    await vehicleRepository.save(vehicle);

    const response = await useCase.execute(vehicle.id, {
      color: '#000',
      price: 20000,
    });

    expect(response.color).toBe('#000');
    expect(response.price).toBe(20000);
  });

  it('should be able to update one vehicle - with no vehicle', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new UpdateVehicleUseCase(vehicleRepository);

    expect(useCase.execute(1, {})).rejects.toThrowError('Vehicle not found');
  });

  it('should be able to update one vehicle - with no properties', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new UpdateVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
      description: '',
    };
    await vehicleRepository.save(vehicle);

    expect(useCase.execute(vehicle.id, {})).rejects.toThrowError(
      'Vehicle properties cannot be updated',
    );
  });

  it('should be able to update one vehicle - with invalid properties', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new UpdateVehicleUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
      description: '',
    };
    await vehicleRepository.save(vehicle);

    expect(useCase.execute(vehicle.id, { id: 1 })).rejects.toThrowError(
      'Vehicle properties cannot be updated',
    );
  });
});
