export interface IVehicle {
  id?: number;
  name: string;
  year: number;
  color: string;
  price: number;
  createdAt?: Date;
  plate: string;
}

export class Vehicle implements IVehicle {
  id: number;
  name: string;
  description: string;
  plate: string;
  isFavorite: boolean;
  year: number;
  color: string;
  price: number;
  createdAt: Date;

  constructor(vehicle: IVehicle) {
    if (!this.isHex(vehicle.color)) {
      throw new Error('Color must be a hexadecimal color');
    }
    Object.assign(this, vehicle);
    if (!vehicle.id) {
      this.createdAt = new Date();
    }
  }

  private isHex(color: string) {
    const hex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
    return hex.test(color);
  }

  setFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  changeColor(color: string) {
    if (!this.isHex(color)) {
      throw new Error('Color must be a hexadecimal color');
    }
    this.color = color;
  }

  changePrice(price: number) {
    if (price < 0) {
      throw new Error('Price must be greater than zero');
    }
    this.price = price;
  }
}
