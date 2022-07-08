import { Vehicle } from '@domain/entities/vehicle.entity';
import { EntitySchema } from 'typeorm';

export const VehicleSchema = new EntitySchema<Vehicle>({
  name: 'vehicles',
  target: Vehicle,
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
    },

    brand: {
      type: 'varchar',
      nullable: false,
    },

    name: {
      type: 'varchar',
      nullable: false,
    },

    description: {
      type: 'varchar',
      nullable: true,
    },

    plate: {
      type: 'varchar',
      nullable: false,
    },

    price: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },

    year: {
      type: 'int',
      nullable: false,
    },

    color: {
      type: 'varchar',
      nullable: false,
    },

    isFavorite: {
      type: 'boolean',
      nullable: false,
      default: false,
    },

    createdAt: {
      type: 'datetime',
      default: 'now()',
    },
  },
});
