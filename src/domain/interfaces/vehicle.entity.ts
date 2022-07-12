import { User } from '@domain/entities/user.entity';

export interface IVehicle {
  id?: number;
  name: string;
  brand: string;
  description: string;
  year: number;
  color: string;
  price: number;
  createdAt?: Date;
  plate: string;
  user?: Partial<User>;
}
