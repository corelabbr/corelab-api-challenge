import { IVehicle } from '@domain/entities/vehicle.entity';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { ListAllVehiclesUseCase } from './listAll.usecase';

describe('Test UseCase List All Vehicles', () => {
  it('should be able to list all vehicles - with 0 vehicles ', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new ListAllVehiclesUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    };

    const response = await useCase.execute();

    expect(response.total).toBe(0);
    expect(response.data).toStrictEqual([]);
  });

  it('should be able to list all vehicles - with 2 vehicles ', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const useCase = new ListAllVehiclesUseCase(vehicleRepository);
    const vehicle: IVehicle = {
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    };
    vehicleRepository.create(vehicle);
    vehicleRepository.create({
      ...vehicle,
      color: '#F3F',
    });

    const response = await useCase.execute();
    expect(response.total).toBe(2);
    expect(response.data).toHaveLength(2);
  });
});
