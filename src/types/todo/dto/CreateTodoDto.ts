import { IsBoolean, IsHexColor, IsOptional, IsString } from "class-validator";

export class CreateTodoDto {
  @IsString()
  title: string;
  
  @IsString()
  description: string 

  @IsString()
  @IsHexColor()
  @IsOptional()
  color?: string

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean
}
