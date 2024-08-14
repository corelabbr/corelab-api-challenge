import { IsBoolean, IsHexColor, IsMongoId, IsOptional, IsString } from "class-validator";

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;
  
  @IsString()
  @IsOptional()
  description?: string 

  @IsString()
  @IsHexColor()
  @IsOptional()
  color?: string

  @IsBoolean()
  @IsOptional()
  isFavorite?: boolean

  @IsMongoId()
  id: string
}
