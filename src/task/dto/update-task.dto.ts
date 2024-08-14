import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MinLength(5)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  text: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}
