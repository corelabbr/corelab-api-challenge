import { IsBoolean, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../dto/PaginationDto";
import { Transform } from "class-transformer";

export class PaginationTodoDto extends PaginationDto {
  @IsOptional()
  @IsBoolean()
  favorites?: boolean

  @IsOptional()
  @IsString()
  color?: string
}
