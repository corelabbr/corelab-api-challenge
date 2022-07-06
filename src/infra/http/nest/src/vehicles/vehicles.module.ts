import { Vehicle } from '@domain/entities/vehicle.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesController } from './vehicles.controller';
import { vehiclesProviders } from './vehicles.providers';

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle])],
  controllers: [VehiclesController],
  providers: vehiclesProviders,
})
export class VehiclesModule {}
