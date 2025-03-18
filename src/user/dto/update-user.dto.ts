import { Exclude } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Exclude()
  id?: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Exclude()
  @IsOptional()
  @IsString()
  password?: string;

  @Exclude()
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @Exclude()
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}
