import { IVehicle } from '@domain/interfaces/vehicle.entity';

export class Vehicle implements IVehicle {
  id?: number;
  name: string;
  brand: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;

  constructor(vehicle: IVehicle) {
    Object.assign(this, vehicle);
    if (!vehicle?.id) {
      this.createdAt = new Date();
    }
  }

  setFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  changeColor(color: string) {
    this.color = color;
  }

  changePrice(price: number) {
    if (price < 0) {
      throw new Error('Price must be greater than zero');
    }
    this.price = price;
  }
}
