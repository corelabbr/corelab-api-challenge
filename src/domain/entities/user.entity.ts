import { IUser } from '@domain/interfaces/user.entity';
import { Vehicle } from './vehicle.entity';

export class User implements IUser {
  id?: number;
  name: string;
  username: string;
  password: string;
  createdAt: Date;
  vehicles: Vehicle[];
  favorites: Vehicle[];

  constructor(user: IUser) {
    Object.assign(this, user);

    if (!user?.id) {
      this.createdAt = new Date();
    }
    this.vehicles = [];
  }
}
