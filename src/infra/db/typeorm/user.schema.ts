import { User } from '@domain/entities/user.entity';
import { Vehicle } from '@domain/entities/vehicle.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VehicleEntityTypeorm } from './vehicle.schema';

@Entity('users')
export class UserEntityTypeorm implements User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => VehicleEntityTypeorm, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @ManyToMany(() => VehicleEntityTypeorm, (vehicle) => vehicle.user)
  @JoinTable()
  favorites: Vehicle[];
}
