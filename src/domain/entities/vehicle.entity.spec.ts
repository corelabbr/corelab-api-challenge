import { Vehicle } from './vehicle.entity';

describe('Test Entity Vehicle', () => {
  const newVehicle = () =>
    new Vehicle({
      id: 1,
      name: 'Fusca',
      year: 2010,
      color: '#FFF',
      price: 10000,
      plate: 'ABC-1234',
      description: 'Carro de luxo',
      brand: 'Volkswagen',
    });

  it('Create Entity', () => {
    const vehicle = newVehicle();

    expect(vehicle).toBeInstanceOf(Vehicle);
    expect(vehicle.id).toBe(1);
  });

  it('Change Color', () => {
    const vehicle = newVehicle();

    vehicle.changeColor('#000');

    expect(vehicle.color).toBe('#000');
  });

  it('Change Price', () => {
    const vehicle = newVehicle();

    vehicle.changePrice(20000);

    expect(vehicle.price).toBe(20000);
  });
});
