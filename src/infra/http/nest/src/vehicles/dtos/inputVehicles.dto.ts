import { IsString, IsNumber, IsHexColor } from 'class-validator';
export class InputVehiclesDto {
  @IsString()
  name: string;

  @IsString()
  @IsHexColor()
  color: string;

  @IsString()
  description: string;

  @IsString()
  plate: string;

  @IsNumber()
  year: number;

  @IsNumber()
  price: number;
}
