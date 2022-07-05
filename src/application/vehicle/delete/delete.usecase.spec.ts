import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleInMemoryRepository } from '@infra/db/memory/vehicleInMemory.repository';
import { DeleteVehicleUseCase } from './delete.usecase';

describe('DeleteVehicleUseCase', () => {
  it('should delete a vehicle', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const deleteVehicleUseCase = new DeleteVehicleUseCase(vehicleRepository);
    const vehicle = new Vehicle({
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    });

    const newVehicle = await vehicleRepository.create(vehicle);

    await deleteVehicleUseCase.execute(newVehicle.id);

    expect(vehicleRepository.vehicles).toHaveLength(0);
  });

  it('should throw an error if vehicle does not exist', async () => {
    const vehicleRepository = new VehicleInMemoryRepository();
    const deleteVehicleUseCase = new DeleteVehicleUseCase(vehicleRepository);

    expect(deleteVehicleUseCase.execute(1)).rejects.toThrow();
  });
});
