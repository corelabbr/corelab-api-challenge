import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsInt()
  status: number;

  @IsOptional()
  @IsBoolean()
  favorite: boolean = false;

  @IsOptional()
  @IsString()
  @Matches(/^#(?:[0-9a-fA-F]{3}){1,2}$/, {
    message: 'Color must be a valid hex code (e.g., #FFF or #FFFFFF)',
  })
  color: string;
}
