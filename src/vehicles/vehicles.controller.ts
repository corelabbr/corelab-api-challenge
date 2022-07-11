import { Controller, Query, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehiclesService.create(createVehicleDto);
  }
  

  @Get()
  async findBySearch(@Query('search') search:string) {
    return this.vehiclesService.findBySearch(search);
  }


  @Get('findByFilter')
  async findByFilter(
    @Query('filter') name:string, @Query('brand') brand: string, 
    @Query('year') year: string,  @Query('color') color: string,
    @Query('minP') minP: string, @Query('maxP') maxP: string,  
  ) 
  { return this.vehiclesService.findByFilter(name, brand, year, color, minP, maxP)};


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vehiclesService.findOne(id);
  }


  @Put(':id')
  update(@Param('id') id: string, @Body() updateVehicle: UpdateVehicleDto) {
    return this.vehiclesService.update(id, updateVehicle);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vehiclesService.remove(id);
  }
}
