import { Vehicle } from '@domain/entities/vehicle.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { usersProviders } from '../user/users.providers';
import { VehiclesController } from './vehicles.controller';
import { vehiclesProviders } from './vehicles.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: [...usersProviders, ...vehiclesProviders],
})
export class VehiclesModule {}
