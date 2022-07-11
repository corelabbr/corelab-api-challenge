import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleRepository } from './vehicles.repository';
import { VehiclesController } from './vehicles.controller';
import {Vehicle, VehicleSchema} from './entities/vehicle.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Vehicle.name, schema: VehicleSchema}])
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService, VehicleRepository]
})
export class VehiclesModule {}
