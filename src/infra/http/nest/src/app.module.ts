import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UserModule } from './user/user.module';
import { VehicleEntityTypeorm } from '@infra/db/typeorm/vehicle.schema';
import { UserEntityTypeorm } from '@infra/db/typeorm/user.schema';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db.sqlite',
      synchronize: true,
      logging: true,
      entities: [VehicleEntityTypeorm, UserEntityTypeorm],
    }),
    VehiclesModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
