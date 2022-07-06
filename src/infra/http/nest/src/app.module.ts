import { VehicleSchema } from '@infra/db/typeorm/vehicle.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      synchronize: true,
      logging: true,
      entities: [VehicleSchema],
    }),
    VehiclesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
