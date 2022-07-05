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
    });

  it('Create Entity', () => {
    const vehicle = newVehicle();

    expect(vehicle).toBeInstanceOf(Vehicle);
    expect(vehicle.id).toBe(1);
  });

  it('Set Favorite True', () => {
    const vehicle = newVehicle();

    vehicle.setFavorite();

    expect(vehicle.isFavorite).toBe(true);
  });

  it('Set Favorite False', () => {
    const vehicle = newVehicle();

    vehicle.setFavorite();
    vehicle.setFavorite();

    expect(vehicle.isFavorite).toBe(false);
  });

  it('Change Color', () => {
    const vehicle = newVehicle();

    vehicle.changeColor('#000');

    expect(vehicle.color).toBe('#000');
  });

  //TODO - Teste para verificar se ocorreu erro ao tentar mudar a cor para um valor inválido
  // it('Change Color with invalid property', async () => {
  //   const vehicle = newVehicle();

  //   expect(vehicle.changeColor('white')).rejects.toThrow(
  //     'Color must be a hexadecimal color',
  //   );
  // });

  it('Change Price', () => {
    const vehicle = newVehicle();

    vehicle.changePrice(20000);

    expect(vehicle.price).toBe(20000);
  });

  //TODO - Teste para verificar se ocorreu erro ao tentar mudar o preço para um valor inválido
  // it('Change Price with invalid property', async () => {
  //   const vehicle = newVehicle();

  //   expect(vehicle.changePrice(-1)).rejects.toThrow(
  //     'Price must be greater than zero',
  //   );
  // });
});
