import { CreateVehicleUseCase } from '@application/vehicle/create/create.usecase';
import { DeleteVehicleUseCase } from '@application/vehicle/delete/delete.usecase';
import { FindOneVehicleUseCase } from '@application/vehicle/find-one/findOne.usecase';
import { ListAllVehiclesUseCase } from '@application/vehicle/list-all/listAll.usecase';
import { SetFavoriteVehicleUseCase } from '@application/vehicle/set-favorite/setFavorite.usecase';
import { UpdateVehicleUseCase } from '@application/vehicle/update/update.usecase';
import { IVehicle } from '@domain/interfaces/vehicle.entity';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InputVehiclesDto } from './dtos/inputVehicles.dto';
import { UpdateVehiclesDto } from './dtos/updateVehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(
    private readonly createVehicleUseCase: CreateVehicleUseCase,
    private readonly listVehiclesUseCase: ListAllVehiclesUseCase,
    private readonly findOneVehiclesUseCase: FindOneVehicleUseCase,
    private readonly deleteVehicleUseCase: DeleteVehicleUseCase,
    private readonly updateVehicleUseCase: UpdateVehicleUseCase,
    private readonly setFavoriteVehicleUseCase: SetFavoriteVehicleUseCase,
  ) {}

  @Post()
  async createVehicle(@Body() vehicle: InputVehiclesDto): Promise<IVehicle> {
    try {
      console.log(vehicle);

      const vehicleCreated = await this.createVehicleUseCase.execute(vehicle);

      return vehicleCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async listVehicles(): Promise<{ total: number; data: IVehicle[] }> {
    return this.listVehiclesUseCase.execute();
  }

  @Get('/:id')
  async findOneVehicle(@Param('id') id: string): Promise<IVehicle> {
    return this.findOneVehiclesUseCase.execute(+id);
  }

  @Put('/:id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() vehicle: UpdateVehiclesDto,
  ): Promise<IVehicle> {
    try {
      const vehicleUpdated = await this.updateVehicleUseCase.execute(
        +id,
        vehicle,
      );

      return vehicleUpdated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('/:id/favorite')
  async favoriteVehicle(@Param('id') id: string): Promise<IVehicle> {
    return this.setFavoriteVehicleUseCase.execute(+id);
  }

  @Delete('/:id')
  async deleteVehicle(@Param('id') id: string): Promise<void> {
    return this.deleteVehicleUseCase.execute(+id);
  }
}
