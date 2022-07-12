import { User } from '@domain/entities/user.entity';
import { Vehicle } from '@domain/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntityTypeorm } from './user.schema';

@Entity('vehicles')
export class VehicleEntityTypeorm implements Vehicle {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  plate: string;

  @Column()
  year: number;

  @Column()
  color: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserEntityTypeorm, (user) => user.vehicles)
  user: User;

  changeColor(color: string): void {
    this.color = color;
  }

  changePrice(price: number): void {
    this.price = price;
  }

  setUser(user: User): void {
    this.user = user;
  }
}
