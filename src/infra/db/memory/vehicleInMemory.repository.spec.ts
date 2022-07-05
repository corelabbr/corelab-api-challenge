import { Vehicle } from '@domain/entities/vehicle.entity';
import { VehicleInMemoryRepository } from './vehicleInMemory.repository';

describe('Test Repository Vehicles', () => {
  const newVehicle = () =>
    new Vehicle({
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
    });

  it('should be able to create a new vehicle', async () => {
    const vehicle = newVehicle();
    const repository = new VehicleInMemoryRepository();
    const createdVehicle = await repository.create(vehicle);
    expect(createdVehicle).toBe(vehicle);
    expect(createdVehicle.id).toBe(1);
  });

  it('should be able to create a 2 new vehicles', async () => {
    const vehicle = newVehicle();
    const repository = new VehicleInMemoryRepository();
    const createdVehicle1 = await repository.create(vehicle);
    const createdVehicle2 = await repository.create({
      ...vehicle,
      color: '#F3F',
    });

    expect(createdVehicle1).toBe(vehicle);
    expect(createdVehicle1.id).toBe(1);
    expect(createdVehicle2.id).toBe(2);
  });

  it('should be able to find all vehicles - with 0 vehicles', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicles = await repository.findAll();
    expect(vehicles).toHaveLength(0);
  });

  it('should be able to find all vehicles - with 1 vehicle', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicle = newVehicle();
    await repository.create(vehicle);
    const vehicles = await repository.findAll();
    expect(vehicles).toHaveLength(1);
  });

  it('should be able to update a vehicle', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicle = newVehicle();
    await repository.create(vehicle);

    vehicle.color = '#000';
    const updatedVehicle = await repository.update(vehicle);

    expect(updatedVehicle.color).toBe('#000');
    expect(updatedVehicle).toBe(vehicle);
  });

  it('should be able to delete a vehicle - with 0 vehicle', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicle = newVehicle();
    const vehicleCreated = await repository.create(vehicle);

    await repository.delete(vehicleCreated.id);

    const vehicles = await repository.findAll();
    expect(vehicles).toHaveLength(0);
  });

  it('should be able to delete a vehicle - with 2 vehicles', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicle = newVehicle();
    const vehicleCreated1 = await repository.create(vehicle);
    await repository.create({ ...vehicle, color: '#000' });

    await repository.delete(vehicleCreated1.id);

    const vehicles = await repository.findAll();
    expect(vehicles).toHaveLength(1);
  });

  it('should be able to find a vehicle', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicle = newVehicle();
    await repository.create(vehicle);

    const foundVehicle = await repository.findOne(vehicle.id);
    expect(foundVehicle).toBe(vehicle);
  });

  it('should be able to find a vehicle - not found', async () => {
    const repository = new VehicleInMemoryRepository();
    const vehicle = newVehicle();
    await repository.create(vehicle);

    const foundVehicle = await repository.findOne(vehicle.id + 1);
    expect(foundVehicle).toBeUndefined();
  });
});
