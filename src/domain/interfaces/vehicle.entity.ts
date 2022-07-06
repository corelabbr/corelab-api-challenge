export interface IVehicle {
  id?: number;
  name: string;
  description: string;
  year: number;
  color: string;
  price: number;
  createdAt?: Date;
  plate: string;
}
