import { IsBoolean, IsOptional, IsString } from "class-validator";
import { PaginationDto } from "../../dto/PaginationDto";

export class PaginationTodoDto extends PaginationDto {
  @IsOptional()
  @IsBoolean()
  favorites?: boolean

  @IsOptional()
  @IsString()
  color?: string
}
