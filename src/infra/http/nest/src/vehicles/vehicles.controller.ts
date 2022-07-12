import { CreateVehicleUseCase } from '@application/vehicle/create/create.usecase';
import { DeleteVehicleUseCase } from '@application/vehicle/delete/delete.usecase';
import { FindByUserVehiclesUseCase } from '@application/vehicle/find-by-user/findByUser.usecase';
import { FindOneVehicleUseCase } from '@application/vehicle/find-one/findOne.usecase';
import { ListAllVehiclesUseCase } from '@application/vehicle/list-all/listAll.usecase';
import { SetFavoriteVehicleUseCase } from '@application/vehicle/set-favorite/setFavorite.usecase';
import { UpdateVehicleUseCase } from '@application/vehicle/update/update.usecase';
import { User } from '@domain/entities/user.entity';
import { Vehicle } from '@domain/entities/vehicle.entity';
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
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetUser } from '../custom/decorators/user.decorator';
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
    private readonly findByUserVehiclesUseCase: FindByUserVehiclesUseCase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createVehicle(
    @GetUser() user: User,
    @Body() vehicleDto: InputVehiclesDto,
  ): Promise<IVehicle> {
    try {
      const vehicle = new Vehicle(vehicleDto, user);
      const vehicleCreated = await this.createVehicleUseCase.execute(vehicle);
      return vehicleCreated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  async listVehicles(): Promise<{ total: number; data: IVehicle[] }> {
    return this.listVehiclesUseCase.all();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-vehicles')
  async myVehicles(
    @GetUser() user: User,
  ): Promise<{ total: number; data: IVehicle[] }> {
    return this.findByUserVehiclesUseCase.execute(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/favorites')
  async findFavoriteVehicle(
    @GetUser() user: User,
  ): Promise<{ total: number; data: IVehicle[] }> {
    console.log(user);

    return this.listVehiclesUseCase.favorite(user.id);
  }

  @Get('/:id')
  async findOneVehicle(@Param('id') id: string): Promise<IVehicle> {
    return this.findOneVehiclesUseCase.execute(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateVehicle(
    @Param('id') id: string,
    @Body() vehicle: UpdateVehiclesDto,
  ): Promise<IVehicle> {
    try {
      console.log(vehicle);
      console.log('defsf34545345sdfsdf');

      const vehicleUpdated = await this.updateVehicleUseCase.execute(
        +id,
        vehicle,
      );

      console.log(vehicleUpdated);

      return vehicleUpdated;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id/favorite')
  async favoriteVehicle(
    @GetUser() user: User,
    @Param('id') id: string,
  ): Promise<void> {
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    await this.setFavoriteVehicleUseCase.execute(+id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteVehicle(@Param('id') id: string): Promise<void> {
    return this.deleteVehicleUseCase.execute(+id);
  }
}
