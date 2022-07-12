import { IVehicle } from '@domain/interfaces/vehicle.entity';
import { User } from './user.entity';

export class Vehicle implements IVehicle {
  id?: number;
  name: string;
  brand: string;
  description: string;
  plate: string;
  year: number;
  color: string;
  price: number;
  createdAt: Date;
  user: Partial<User>;

  constructor(vehicle: IVehicle, user?: Partial<User>) {
    Object.assign(this, vehicle);

    if (user) {
      this.user = user;
    }

    if (!vehicle?.id) {
      this.createdAt = new Date();
    }
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
