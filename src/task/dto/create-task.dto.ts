import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  text: string;

  @IsBoolean()
  @IsOptional()
  isFavorite: boolean;

  @IsString()
  @IsOptional()
  color?: string;
}
