import { IUser } from '@domain/interfaces/user.entity';
import { IVehicle } from '@domain/interfaces/vehicle.entity';

export class CreateUserDto implements IUser {
  id?: number;
  createdAt?: Date;
  vehicles: IVehicle[];
  favorites: IVehicle[];
  name: string;
  username: string;
  password: string;
}
