import { IsString, IsNotEmpty } from 'class-validator';
export class InputVehiclesDto {
  @IsString()
  name: string;

  @IsString()
  brand: string;

  @IsString()
  color: string;

  @IsString()
  description: string;

  @IsString()
  plate: string;

  @IsNotEmpty()
  year: number;

  @IsNotEmpty()
  price: number;
}
