import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

export class PaginationDto {
  @IsNumber()
  page: number
  
  @IsPositive()
  size: number

  @IsOptional()
  @IsString()
  term?: string
}
