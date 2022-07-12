import { IVehicle } from './vehicle.entity';

export interface IUser {
  id?: number;
  name: string;
  username: string;
  password: string;
  createdAt?: Date;
  vehicles: IVehicle[];
  favorites: IVehicle[];
}
